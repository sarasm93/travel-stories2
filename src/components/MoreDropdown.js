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

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className='ml-1'>
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-center"
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
          <i className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};