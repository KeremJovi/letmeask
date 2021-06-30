import { useHistory, useParams } from "react-router-dom";

import googleIconImg from "../assets/images/google-icon.svg";
import questionImg from "../assets/images/question.svg";
import logoqImg from "../assets/images/logoq.svg";

import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";

type AccessRoomParams = {
  roomId: string;
};

export function AccessRoom() {
  const history = useHistory();
  const params = useParams<AccessRoomParams>();
  const { user, signInWithGoogle } = useAuth();
  const roomId = params.roomId;

  async function handleEnteringRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push(`/rooms/${roomId}`);
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
          <button onClick={handleEnteringRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Entre na sala com o Google
          </button>
        </div>
      </main>
    </div>
  );
}
