import React from 'react'

export const twoPersons = (color = '#CDCDCD', secondary = '#EEEFF1') => (
  <svg viewBox="0 -8 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.75 24.0432V33.6355L11.5547 34.0352L11.1562 34.8345V41.6291L12.75 42.8281L13.1484 44.0272C12.8297 45.6259 15.6719 49.4895 17.1328 51.2214V58.4157C13.9453 60.8138 6.85313 65.8497 3.98438 66.809C1.11563 67.7682 0.132812 70.6725 0 72.0048V78H51V72.0048C50.6813 69.7666 48.2109 67.8748 47.0156 67.2086C46.0859 66.6757 43.1906 65.0504 39.0469 62.8122C34.9031 60.5739 33.0703 58.9486 32.6719 58.4157V51.2214C34.2656 49.9425 36.125 45.8924 36.6562 44.0272L38.25 43.2278L39.4453 41.6291V34.4349L37.8516 33.6355V24.0432C37.8516 22.4445 35.8594 16.849 25.5 16.0496C17.2125 15.4101 13.5469 21.1122 12.75 24.0432Z"
      fill={secondary}/>
    <path
      d="M35 10.0621V22.0621L33.5 22.562L33 23.562V32.062L35 33.562L35.5 35.062C35.1 37.062 38.6667 41.8953 40.5 44.062V53.062C36.5 56.062 27.6 62.362 24 63.562C20.4 64.762 19.1667 68.3953 19 70.062V77.562H83V70.062C82.6 67.262 79.5 64.8953 78 64.062C76.8333 63.3953 73.2 61.362 68 58.562C62.8 55.762 60.5 53.7287 60 53.062V44.062C62 42.462 64.3333 37.3953 65 35.062L67 34.062L68.5 32.062V23.062L66.5 22.0621V10.0621C66.5 8.06209 64 1.06205 51 0.0620511C40.6 -0.737949 36 6.39538 35 10.0621Z"
      fill={color}/>
  </svg>
)
