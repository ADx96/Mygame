import * as Chess from "chess.js";
import { BehaviorSubject } from "rxjs";

let chess = new Chess();

export const gameSubject = new BehaviorSubject();

export function initGame() {
  chess.put({ type: "n", color: "b" }, "a7");
  chess.put({ type: "q", color: "b" }, "b7");
  chess.put({ type: "n", color: "b" }, "c7");
  chess.put({ type: "p", color: "b" }, "e7");
  chess.put({ type: "q", color: "b" }, "d7");
  chess.put({ type: "p", color: "b" }, "f7");
  chess.put({ type: "b", color: "b" }, "g7");
  chess.put({ type: "p", color: "b" }, "h7");

  chess.put({ type: "n", color: "w" }, "a2");
  chess.put({ type: "b", color: "w" }, "b2");
  chess.put({ type: "q", color: "w" }, "c2");
  chess.put({ type: "k", color: "w" }, "e2");
  chess.put({ type: "p", color: "w" }, "d2");
  chess.put({ type: "k", color: "w" }, "f2");
  chess.put({ type: "n", color: "w" }, "g2");
  chess.put({ type: "b", color: "w" }, "h2");

  updateGame();
}
export function header() {
  chess.header("White", "Robert James Fischer");
}

export function resetGame() {
  chess.reset();
  chess.put({ type: "n", color: "b" }, "a7");
  chess.put({ type: "q", color: "b" }, "b7");
  chess.put({ type: "n", color: "b" }, "c7");
  chess.put({ type: "p", color: "b" }, "e7");
  chess.put({ type: "q", color: "b" }, "d7");
  chess.put({ type: "p", color: "b" }, "f7");
  chess.put({ type: "b", color: "b" }, "g7");
  chess.put({ type: "p", color: "b" }, "h7");

  chess.put({ type: "n", color: "w" }, "a2");
  chess.put({ type: "b", color: "w" }, "b2");
  chess.put({ type: "q", color: "w" }, "c2");
  chess.put({ type: "k", color: "w" }, "e2");
  chess.put({ type: "p", color: "w" }, "d2");
  chess.put({ type: "k", color: "w" }, "f2");
  chess.put({ type: "n", color: "w" }, "g2");
  chess.put({ type: "b", color: "w" }, "h2");

  updateGame();
}

export function handleMove(from, to) {
  const promotions = chess.moves({ verbose: true }).filter((m) => m.promotion);
  console.table(promotions);
  if (promotions.some((p) => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion = { from, to, color: promotions[0].color };
    updateGame(pendingPromotion);
  }
  const { pendingPromotion } = gameSubject.getValue();

  if (!pendingPromotion) {
    move(from, to);
  }
}

export function move(from, to, promotion) {
  let tempMove = { from, to };
  if (promotion) {
    tempMove.promotion = promotion;
  }
  const legalMove = chess.move(tempMove);

  if (legalMove) {
    updateGame();
  }
}

function updateGame(pendingPromotion) {
  const isGameOver = chess.game_over();

  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    turn: chess.turn(),
    result: isGameOver ? getGameResult() : null,
  };

  localStorage.setItem("savedGame", chess.fen());

  gameSubject.next(newGame);
}
function getGameResult() {
  if (chess.in_checkmate()) {
    const winner = chess.turn() === "w" ? "DC" : "MARVEL";
    return `CHECKMATE - WINNER - ${winner}`;
  } else if (chess.in_draw()) {
    let reason = "50 - MOVES - RULE";
    if (chess.in_stalemate()) {
      reason = "STALEMATE";
    } else if (chess.in_threefold_repetition()) {
      reason = "REPETITION";
    } else if (chess.insufficient_material()) {
      reason = "INSUFFICIENT MATERIAL";
    }
    return `DRAW - ${reason}`;
  } else {
    return "UNKNOWN REASON";
  }
}
