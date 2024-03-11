export default function AuthButton({ name }) {
  return (
    <button type="submit" className="btn btn-primary w-100 auth-btn">
      {name}
    </button>
  );
}
