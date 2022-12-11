function padZero(x, digits) {
  return x.toString().padStart(digits, "0");
}

function Datetime({ date }) {
  return (
    <time dateTime={date.toString()}>
      {padZero(date.getFullYear(), 4)}-{padZero(date.getMonth() + 1, 2)}-
      {padZero(date.getDate(), 2)} {padZero(date.getHours(), 2)}:
      {padZero(date.getMinutes(), 2)}
    </time>
  );
}

export function Review({ review }) {
  return (
    <article className="message is-dark">
      <div className="message-body p-2 pl-3">
        <h3 className="title is-5 mb-0">{review.title}</h3>
        <p className="mt-2 mb-2">{review.comment}</p>
        <p className="has-text-right">
          <small>
            by {review.user.nickname} さん
            <br />
            <Datetime date={new Date(review.createdAt)} />
          </small>
        </p>
      </div>
    </article>
  );
}
