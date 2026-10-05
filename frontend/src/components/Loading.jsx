export default function Loading({ text = 'Loading...' }) {
  return (
    <div className="loading">
      <div className="spinner" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}
