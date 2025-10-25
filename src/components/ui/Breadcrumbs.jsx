import React from "react";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <a href={item.link}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <FaChevronRight className="breadcrumb-icon" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
