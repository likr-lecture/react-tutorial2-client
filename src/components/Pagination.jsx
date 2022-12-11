import { Link } from "react-router-dom";

export function Pagination({ path, page, perPage, count }) {
  return (
    <nav className="pagination is-centered">
      <Link
        className="pagination-previous"
        to={`${path}?page=${page - 1}`}
        disabled={page === 1}
      >
        前の{perPage}件
      </Link>
      <Link
        className="pagination-next"
        to={`${path}?page=${page + 1}`}
        disabled={perPage * page >= count}
      >
        次の{perPage}件
      </Link>
    </nav>
  );
}
