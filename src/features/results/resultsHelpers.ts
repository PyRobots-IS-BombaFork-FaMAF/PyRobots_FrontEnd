import React from "react";

// Types
export type modalState = {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  export type player = {
    player: string,
    robot: string
  }
  
  export type gameResults = {
    id: number,
    name: string,
    creation_date: string,
    creator: string,
    rounds: number,
    games: number, 
    is_private: boolean,
    players: Array<player>,
    duration: number,
    winners: Array<player>,
    rounds_won: number
  }
  
  export type indexAndCurrentResult = {
    currentResult: Array<gameResults>,
    idStats: number
  }

  export type resultForCards = {
    gameDate: string, 
    gameName: string,
    index: number,
    resultOfGame: string,
    robotName: string,
    setIdStats: any
  }
  