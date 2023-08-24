import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";


const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
    className="fa-solid fa-ellipsis-vertical pt-1"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}/>
));

const Pen = React.forwardRef(({ onClick }, ref) => (
  <i
  className="fa-solid fa-pencil"
  ref={ref}
  onClick={(e) => {
    e.preventDefault();
    onClick(e);
  }}/>
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className='ml-1'>
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className={styles.DropdownMenu}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <p>Edit</p>
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
            <p>Delete</p>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={styles.Absolute} drop="left">
      <Dropdown.Toggle as={Pen} />
      <Dropdown.Menu>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          Edit username
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          Change password
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/profileinfo`)}
          aria-label="edit-profileinfo"
        >
          Edit profile information
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}