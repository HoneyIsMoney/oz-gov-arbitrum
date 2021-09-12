//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

contract LendingPoolMock {
    bool public isPaused;
    
    event SetPaused(bool paused);

    constructor() {
        isPaused = false;
    }
    
    function setPoolPause(bool _isPaused) external {
        isPaused = _isPaused;
        emit SetPaused(_isPaused);
    }
    
}