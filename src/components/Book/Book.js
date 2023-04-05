import { Fragment } from "react";

export default function Book({ title, description, author, publishedDate }) {
  return (
    <Fragment>
      <td>{title}</td>
      <td>{description}</td>
      <td>{author}</td>
      <td>{new Date(publishedDate).toLocaleDateString()}</td>
    </Fragment>
  )
}