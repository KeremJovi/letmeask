/*
Dicas : 
1- respasividade = tem no canal da rockeat 
2- criar tema dark ou light 
3- versão pwa = create react app tem suporte só procurar
4- testar outros bancos de dados: superbase 
5- biblioteca de css - styled components 
6- EsLint e Prettier
7- Github - fazer o redeme 
*/

import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import googleIconImg from "../assets/images/google-icon.svg";
import questionImg from "../assets/images/question.svg";
import logoqImg from "../assets/images/logoq.svg";

import Button from "./../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }
    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }
  return (
    <div id="page-auth">
      <aside>
        <img
          src={logoqImg}
          alt="Ilustração Sibolizando perguntas e respostas"
        />
        <strong> Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-container">
          <img src={questionImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type="submit">Entre na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
