import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import { FaCheck } from "react-icons/fa";
import AmountButtons from "./AmountButtons";
import { Button, IconButton } from "@mui/material";

const AddToCard = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, stock, colors } = product;
  /* STATE */
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  console.log(mainColor);

  const increaseAmount = () => {
    if (amount <= stock) {
      setAmount(amount + 1);
    }
  };
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors: </span>
        <div>
          {colors.map((color, index) => {
            return (
              <IconButton
                variant="outlined"
                key={index}
                size="medium"
                className={`${
                  mainColor === color ? "color-btn active" : "color-btn"
                }`}
                onClick={() => {
                  setMainColor(color);
                }}
                sx={{
                  width: "30px",
                  height: "30px",
                  marginRight: "1rem",
                  backgroundColor: color + "!important",
                }}
              >
                {mainColor === color ? <FaCheck /> : ""}
              </IconButton>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
        />
        <Link to="/cart">
          <Button
            variant="contained"
            color="warning"
            sx={{ fontSize: "1.5rem" }}
            onClick={() => {
              return addToCart(id, mainColor, amount, product);
            }}
          >
            Add to cart
          </Button>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 0px;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
      font-size: 1.6rem;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1.5rem;
      color: #ffffff;
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;

export default AddToCard;
