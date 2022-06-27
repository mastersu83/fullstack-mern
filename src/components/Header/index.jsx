import React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import styles from "./Header.module.scss";

import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/authSlice";

export const Header = () => {
  const dispatch = useDispatch();

  let { isAuth } = useSelector((state) => state.auth);

  if (window.localStorage.getItem("token")) {
    isAuth = true;
  }

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logOut());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ARCHAKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
