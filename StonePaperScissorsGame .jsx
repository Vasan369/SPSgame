import React, { useState } from "react";
import "./StonePaperScissorsGame.css"; // Import CSS for animations


const StonePaperScissorsGame = () => {
    const players = { player1: "You", player2: "Vasanth" };
    const choices = ["Stone", "Paper", "Scissors"];
    const [rounds, setRounds] = useState([]);
    const [player1Choice, setPlayer1Choice] = useState("");
    const [player2Choice, setPlayer2Choice] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [winner, setWinner] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState("");
    const [currentRound, setCurrentRound] = useState(0); // Track current round

    const handleChoice = (choice) => {
        setPlayer1Choice(choice);
        setSelectedChoice(choice);
        setPlayer2Choice("");
        setSubmitted(false);
    };

    const handleSubmit = () => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setPlayer2Choice(randomChoice);
        handleRound(player1Choice, randomChoice);
        setSubmitted(true);
        setShowPopup(true);
        setTimeout(() => { setShowPopup(false); }, 2000);
    };

    const determineWinner = (player1Choice, player2Choice) => {
        if (player1Choice === player2Choice) return "Tie";
        if (
            (player1Choice === "Stone" && player2Choice === "Scissors") ||
            (player1Choice === "Scissors" && player2Choice === "Paper") ||
            (player1Choice === "Paper" && player2Choice === "Stone")
        ) {
            return players.player1;
        } else {
            return players.player2;
        }
    };

    const popupBg = () => {
        if (winner === "Vasanth") {
            return 'bg-red-500';
        }
        else if (winner === "You") {
            return 'bg-green-500';
        }
        else {
            return 'bg-yellow-500';
        }
    }

    const wins = () => {
        if (winner === "Tie") {
            return <p>{winner}</p>
        }
        else {
            return <p>{winner} wins</p>
        }
    }

    const addRound = (round) => {
        const newRounds = [...rounds, round];
        setRounds(newRounds);
        if (newRounds.length === 4) setGameOver(true);
    };

    const handleRound = (player1Choice, player2Choice) => {
        const roundWinner = determineWinner(player1Choice, player2Choice);
        setWinner(roundWinner);
        addRound({ player1Choice, player2Choice, roundWinner });
    };

    const nextRound = () => {
        setPlayer1Choice("");
        setPlayer2Choice("");
        setSelectedChoice("");
        setSubmitted(false);
        setCurrentRound(currentRound + 1); // Move to next round
    };

    const restartGame = () => {
        setRounds([]); // Reset rounds
        setPlayer1Choice(""); // Reset player 1 choice
        setPlayer2Choice(""); // Reset player 2 choice
        setGameOver(false); // Reset game over status
        setCurrentRound(0); // Reset current round
        setWinner(""); // Reset winner state
        setSubmitted(false); // Reset submitted status
        setShowPopup(false); // Hide any popup
        setSelectedChoice(""); // Reset selected choice
    };

    const player1Wins = rounds.filter((round) => round.roundWinner === players.player1).length;
    const player2Wins = rounds.filter((round) => round.roundWinner === players.player2).length;

    return (
        <div className="flex flex-col  items-center h-screen text-white relative">
            {showPopup && (
                <div className={`popup  absolute top-0 rounded-full shadow-lg left-0 right-0 flex items-center justify-center ${popupBg()} py-1 px-3  transition duration-300 ease-in animate-popup`}>
                    <div className="popup-content text-white text-xl">
                        <p>{wins()}</p>
                    </div>
                </div>
            )}

            <h1 className="text-4xl mt-3 py-5 flex items-center bg-blue-gray-200 text-center font-bold rounded-xl">Stone Paper Scissors</h1>

            {!gameOver ? (
                <>
                    <h2 className="mb-4 text-black text-3xl mt-3">Round {currentRound + 1}</h2>
                    <div className="flex justify-around mb-8">
                        <div className="text-center">

                            {!submitted && choices.map((choice) => (
                                <button
                                    key={choice}
                                    onClick={() => handleChoice(choice)}
                                    className={`px-4 py-2 m-2 rounded transition-all duration-200 transform hover:scale-105 active:scale-90 ${selectedChoice === choice ? "bg-yellow-500 " : "bg-blue-500 hover:bg-blue-700"}`}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    </div>
                    {!submitted && (
                        <button
                            onClick={handleSubmit}
                            className={`px-6 py-2 m-2 ${player1Choice ? 'bg-green-500 hover:bg-green-700 transition duration-300' : 'bg-green-100'} rounded-full `} disabled={!player1Choice}
                        >
                            Go
                        </button>
                    )}
                    {submitted && (
                        <div className="mt-2 text-center fade-in">

                            <table className="w-full bg-gray-800 text-white">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">{player1Choice}</th>
                                        <th className="border px-4 py-2">{player2Choice}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">You</td>
                                        <td className="border px-4 py-2">Vasanth</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                onClick={nextRound}
                                className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center">
                    <h2 className="mb-4 text-3xl mt-3 text-red-500" >Game Over</h2>
                    <p className="text-xl text-black">{players.player1} Wins: {player1Wins}</p>
                    <p className="text-xl text-black">{players.player2} Wins: {player2Wins}</p>
                    <p>
                        {player1Wins === player2Wins ? (
                            <p className="text-3xl mt-5 text-black">Match draw!!!</p>
                        ) : player1Wins > player2Wins ? (
                            <p className="text-3xl mt-5 text-green-500">Winner is {players.player1}</p>
                        ) : (
                            <p className="text-3xl mt-5 text-green-500">Winner is {players.player2}</p>
                        )}
                    </p>
                    <button
                        onClick={restartGame}
                        className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition duration-300"
                    >
                        Restart Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default StonePaperScissorsGame;
