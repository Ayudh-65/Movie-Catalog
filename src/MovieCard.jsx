export default function MovieCard({ movie }) {
  return (
    <div className="movie">
      <div className="year">
        <p>{movie?.Year}</p>
      </div>

      <div>
        <img className="poster" src={movie?.Poster} alt={movie?.Title} />
      </div>

      <div className="foot">
        <span>{movie?.Type}</span>
        <h3>{movie?.Title}</h3>
      </div>
    </div>
  );
}
