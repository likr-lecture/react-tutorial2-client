import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getRestaurant, getRestaurantReviews } from "../api.js";
import { Breadcrumb, Loading, Pagination, Review } from "../components";

function Form({ onSubmit }) {
  async function handleFormSubmit(event) {
    event.preventDefault();
    if (onSubmit) {
      const record = {
        title: event.target.elements.title.value,
        comment: event.target.elements.comment.value,
      };
      event.target.elements.title.value = "";
      event.target.elements.comment.value = "";
      onSubmit(record);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <div className="control">
          <label className="label">タイトル</label>
          <div className="control">
            <input name="title" className="input" required disabled />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <label className="label">コメント</label>
          <div className="control">
            <textarea name="comment" className="textarea" required disabled />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-warning" disabled>
            レビューを投稿
          </button>
        </div>
        <p className="help">ログインが必要です。</p>
      </div>
    </form>
  );
}

function Restaurant({ restaurant, reviews, page, perPage }) {
  return (
    <>
      <article className="box">
        <h3 className="title is-5">{restaurant.name}</h3>
        <div className="columns">
          <div className="column is-6">
            <figure className="image is-square">
              <img
                src={restaurant.image || "/images/restaurants/noimage.png"}
                alt={restaurant.name}
              />
            </figure>
          </div>
          <div className="column is-6">
            <figure className="image is-square">
              <div
                className="has-ratio"
                dangerouslySetInnerHTML={{ __html: restaurant.map }}
              ></div>
            </figure>
          </div>
        </div>
      </article>
      <div className="box">
        {reviews.rows.length === 0 ? (
          <p>レビューがまだありません。</p>
        ) : (
          <>
            <div className="block">
              <p>{reviews.count}件のレビュー</p>
            </div>
            <div className="block">
              {reviews.rows.map((review) => {
                return <Review key={review.id} review={review} />;
              })}
            </div>
            <div className="block">
              <Pagination
                path={`/restaurants/${restaurant.id}`}
                page={page}
                perPage={perPage}
                count={reviews.count}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function RestaurantDetailPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState(null);

  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getRestaurant(params.restaurantId).then((data) => {
      setRestaurant(data);
    });
  }, [params.restaurantId]);

  useEffect(() => {
    getRestaurantReviews(params.restaurantId, {
      limit: perPage,
      offset: (page - 1) * perPage,
    }).then((data) => {
      setReviews(data);
    });
  }, [params.restaurantId, page]);

  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/restaurants", content: "ラーメン店一覧" },
            {
              href: `/restaurants/${params.restaurantId}`,
              content: restaurant && `${restaurant.name} の情報`,
              active: true,
            },
          ]}
        />
      </div>
      {restaurant == null || reviews == null ? (
        <Loading />
      ) : (
        <Restaurant
          restaurant={restaurant}
          reviews={reviews}
          page={page}
          perPage={perPage}
        />
      )}
      <div className="box">
        <Form />
      </div>
    </>
  );
}
