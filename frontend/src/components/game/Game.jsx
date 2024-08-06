import React from "react";
import {useState, useEffect, useRef} from "react";


import animationGif from "../../assets/animations.gif";
import ghostImage from "../../assets/ghost.png";

import * as Constants from "./Constants";
import Pacman from "./Pacman";
import Ghost from "./Ghost";


function Game() {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pacmanFrames = document.getElementById("animation");
        const ghostFrames = document.getElementById("ghosts");


        let pacman;
        let foodCount;

        let ghostCount = 4;
        let ghosts = [];
        let ghostLocations = [
            {x: 0, y: 0 },
            {x: 176, y: 0},
            {x: 0, y: 121},
            {x: 176, y: 121}
        ];


        let fps = Constants.fps;
        let wallColor = Constants.wallColor
        let oneBlockSize = Constants.oneBlockSize;
        let wallSpaceWidth = Constants.wallSpaceWidth;
        let wallOffset = Constants.wallOffset
        let wallInnerColor = Constants.wallInnerColor;

        const DIRECTION_RIGHT = Constants.DIRECTION_RIGHT;
        const DIRECTION_UP = Constants.DIRECTION_UP;
        const DIRECTION_LEFT = Constants.DIRECTION_LEFT;
        const DIRECTION_BOTTOM = Constants.DIRECTION_BOTTOM;

        let map = Constants.map;
        let randomTargetsForGhosts = [
            { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
            { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
            { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
            {
                x: (map[0].length - 2) * oneBlockSize,
                y: (map.length - 2) * oneBlockSize,
            },
        ];


        let createRect = (x, y, width, height, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
        };

                
        let update = () => {
            pacman.moveProcess();
            pacman.eat();
            
            for (let i = 0; i < ghosts.length; i++) {
                ghosts[i].moveProcess();
            }

            if (pacman.checkGhostCollision(ghosts)) {
                onGhostCollision();
            }

            console.log(foodCount);
            if (pacman.score >= foodCount) {
                gameWinner();
            }

        }

        let drawWinner = () => {    
            ctx.font = "20px PacFont";
            ctx.fillStyle = "white";
            ctx.fillText("You Win!", 130, 250);
        }


        let gameWinner = () => {
            clearInterval(intervalId);
            drawWinner();
        }


        let onGhostCollision = () => {
            resetPacmanAndGhosts();
        };

        let drawGameOver = () => {
            ctx.font = "20px PacFont";
            ctx.fillStyle = "white";
            ctx.fillText("Game Over!", 130, 250);
        }

        let gameOver = () => {
            clearInterval(intervalId);
            drawGameOver();
        }

        let resetPacmanAndGhosts = () => {
            pacman.reduceLives(1);

            if (pacman.lives == 0) {
                gameOver();
            }

            pacman.x = oneBlockSize;
            pacman.y = oneBlockSize;
            createNewGhosts();
        };

        
        let drawWalls = () => {
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[0].length; j++) {
                    if (map[i][j] == 1) {
                        createRect(
                            j * oneBlockSize,
                            i * oneBlockSize,
                            oneBlockSize,
                            oneBlockSize,
                            wallColor
                        );

                        // account for wall on left
                        if (j > 0 && map[i][j - 1] == 1) {
                            createRect(
                                j * oneBlockSize,
                                i * oneBlockSize + wallOffset,
                                wallSpaceWidth + wallOffset,
                                wallSpaceWidth,
                                wallInnerColor
                            );
                        }

                        // account for wall on right
                        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                            createRect(
                                j * oneBlockSize + wallOffset,
                                i * oneBlockSize + wallOffset,
                                wallSpaceWidth + wallOffset,
                                wallSpaceWidth,
                                wallInnerColor
                            );
                        }
                        
                        // account for wall on top
                        if (i > 0 && map[i - 1][j] == 1) {
                            createRect(
                                j * oneBlockSize + wallOffset,
                                i * oneBlockSize,
                                wallSpaceWidth,
                                wallSpaceWidth + wallOffset,
                                wallInnerColor
                            );
                        }

                        // account for wall on bottom
                        if (i < map.length - 1 && map[i + 1][j] == 1) {
                            createRect(
                                j * oneBlockSize + wallOffset,
                                i * oneBlockSize + wallOffset,
                                wallSpaceWidth,
                                wallSpaceWidth + wallOffset,
                                wallInnerColor
                            );
                        }
                    
                    }
                }
            }
        };

        let drawFoods = () => {
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[0].length; j++) {
                    if (map[i][j] == 2) {
                        createRect(
                            j * oneBlockSize + oneBlockSize / 3,
                            i * oneBlockSize + oneBlockSize / 3,
                            oneBlockSize / 3,
                            oneBlockSize / 3,
                            "#FEB897"
                        );
                    }
                }
            }
        };

        let drawScore = () => {

            ctx.font = "18px PacFont";
            ctx.fillStyle = "white";
            ctx.fillText(
                "SCORE: " + pacman.score,
                20,
                oneBlockSize * (map.length + 1)
            );
        };

        let drawGhosts = () => {
            for (let i = 0; i < ghosts.length; i++) {
                ghosts[i].draw();
            }
        }

        let drawLives = () => {

            let lives = pacman.lives; 

            ctx.font = "18px PacFont";
            ctx.fillStyle = "white";
            ctx.fillText("Lives: ", 220, oneBlockSize * (map.length + 1));

            for (let i = 0; i < lives; i++) {
                ctx.drawImage(
                    pacmanFrames,
                    2 * oneBlockSize,
                    0,
                    oneBlockSize,
                    oneBlockSize,
                    340 + i * oneBlockSize,
                    oneBlockSize * map.length + 2,
                    oneBlockSize,
                    oneBlockSize
                );        
            }
        }

        let draw = () => {
            // ? Todo
            // clear the canvas with black color
            createRect(0, 0, canvas.width, canvas.height, "black");
            drawWalls(); 
            drawFoods();
            pacman.draw()
            drawScore();
            drawGhosts();
            drawLives();
        };
        

        let gameLoop = () => {
            draw();
            update();
        };

        let createNewPacman = () => {
            return new Pacman(
                oneBlockSize,
                oneBlockSize,
                Constants.pacManWidth,
                Constants.pacManHeight,
                Constants.pacManSpeed,
            );
        };

        let createNewGhosts = () => {
            ghosts = [];
            for (let i = 0; i < ghostCount; i++) {
                let ghost = new Ghost(
                    9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
                    10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    pacman.speed/2,
                    ghostLocations[i].x,
                    ghostLocations[i].y,
                    124,    
                    116,
                    Constants.ghostRange + i,
                    pacman,
                    randomTargetsForGhosts
                );
                ghosts.push(ghost);
            }
        }


        // add an event listener to the window to listen for keydown events
        window.addEventListener("keydown", (e) => {
            let key = e.key;

            if (key == "ArrowRight" || key == "d") {
                pacman.nextDirection = DIRECTION_RIGHT;
            }  else if (key == "ArrowLeft" || key == "a") {
                pacman.nextDirection = DIRECTION_LEFT;
            } else if (key == "ArrowUp" || key == "w") {
                pacman.nextDirection = DIRECTION_UP;
            } else if (key == "ArrowDown" || key == "s") {
                pacman.nextDirection = DIRECTION_BOTTOM;
            }   
        }
        );  

        let getFoodCount = (map) =>  {
            let foodCount = 0;
            
            for (let i = 0; i < map.length; i++) {
                for (let j = 0; j < map[0].length; j++) {
                    if (map[i][j] == 2) {
                        foodCount++;
                    }
                }
            }

            return foodCount;
        }
            
        foodCount = getFoodCount(map);
        pacman = createNewPacman();
        createNewGhosts();
        const intervalId = setInterval(gameLoop, 1000 / Constants.fps);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once on mount


    return (    
        <>
            <canvas ref = {canvasRef} id="gameCanvas" width="500" height="500" style={{ backgroundColor: "black" }}> </canvas>

            <div style={{display : "none"}}>

                <img src={animationGif} id = "animation" alt="" />
                <img src={ghostImage} id = "ghosts" alt="" />

            </div>
            
        </>
    )
}

export default Game;