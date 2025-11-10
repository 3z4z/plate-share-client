export const regex = {
  email: /^.+@gmail\.com$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
  imageUrl:
    /^https?:\/\/(?:i\.|images\d*\.|thumbs\d*\.)?imgbox\.com\/|^https?:\/\/(?:i\.)?ibb\.co(?:.com)?\//i,
};

export const validationMessage = {
  name: "Name must have at least 3 characters",
  email: "Only @gmail.com is allowed",
  password:
    "Invalid password. Must have uppercase, lowercase and minimum 6 characters",
  imageUrl: "Only imgbox or imgbb urls are allowed",
};

export const requiredMessage = {
  name: "Required a name to register",
  email: "Required an email address",
  photoUrl: "Photo URL is required",
  password: "Required a password",
};
