import React, { useState } from 'react'
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Media from 'react-bootstrap/Media';
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';

const Comment = (props) => {

  const {
    profile_id,
    profile_image,
    owner,
    created_at,
    content,
    id,
    setStory,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setStory((prevStory) => ({
        results: [
          {
            ...prevStory.results[0],
            comments_count: prevStory.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
      <>
        <Media className={styles.Media}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="align-self-center ml-2">
            <span className={styles.Owner}>{owner} </span>
            <span className={styles.Date}>{created_at}</span>
            <p>{content}</p>
          </Media.Body>
          {is_owner && (
            <MoreDropdown
              handleEdit={() => {}}
              handleDelete={handleDelete}
            />
          )}
        </Media>
      </>
  )
};

export default Comment;