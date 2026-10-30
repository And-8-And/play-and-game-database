import { useParams } from 'react-router-dom';
import { gamesApi } from '../api/gamesApi.js';
import { useAsync } from '../hooks/useAsync.js';
import AsyncView from '../components/common/AsyncView.jsx';
import FavoriteButton from '../components/games/FavoriteButton.jsx';
import ScreenshotGallery from '../components/games/ScreenshotGallery.jsx';
import GameInfoList from '../components/games/GameInfoList.jsx';
import SystemRequirements from '../components/games/SystemRequirements.jsx';
import ReviewsSummary from '../components/games/ReviewsSummary.jsx';

export default function GameDetailsPage() {
  const { id } = useParams();
  const state = useAsync(() => gamesApi.getById(id), [id]);

  return (
    <AsyncView state={state}>
      {(game) => (
        <article className="details">
          <header className="details-head">
            {game.cover && <img className="details-cover" src={game.cover} alt={`${game.name} cover`} />}
            <div>
              <h1>{game.name}</h1>
              <FavoriteButton gameId={game.id} withLabel />
              <GameInfoList game={game} />
            </div>
          </header>

          <section>
            <h2>About the game</h2>
            <p className="pre">{game.description || 'No description available.'}</p>
          </section>
          <section>
            <h2>Screenshots</h2>
            <ScreenshotGallery images={game.screenshots} gameName={game.name} />
          </section>
          <section>
            <h2>System requirements</h2>
            <SystemRequirements requirements={game.systemRequirements} />
          </section>
          <section>
            <h2>Reviews</h2>
            <ReviewsSummary reviews={game.reviews} />
          </section>
        </article>
      )}
    </AsyncView>
  );
}