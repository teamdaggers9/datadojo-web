export const getRandomValue = (type, length = 20) => {
  const crypto = window.crypto;
  let array = new Uint32Array(1);
  switch (type) {
    case "number":
      return crypto.getRandomValues(array)[0];
    case "string":
      const stringWishlist =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => stringWishlist[x % stringWishlist.length])
        .join("");
    case "mixed":
      const mixedWishlist =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$";
      return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => mixedWishlist[x % mixedWishlist.length])
        .join("");
    default:
      return;
  }
};
