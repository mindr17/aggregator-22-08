import React, { useEffect, useState } from 'react';
import styles from './AliChat.module.scss';

export default function AliChat (props: any) {
  return (
    <div className={styles.msg}>
      <div className={styles.msg__left}>
        <div className={styles.msg__avatar}></div>
      </div>
      <div className={styles.msg__right}>
        <div className={styles.msg__speechpad}></div>
        <div className={styles.msg__author}>name</div>
        <div className={styles.msg__text}>text</div>
      </div>
    </div>
  )
};
