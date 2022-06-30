export const isNumber = (value?: any): value is number => {
  // or typeof value === "number" && Number.isFinite(value)
  return typeof value === "number" && !Number.isNaN(value);
};

export const isString = (value?: any): value is string => {
  return typeof value === "string";
};

type Fish = { swim: () => void };
type Bird = { fly: () => void };

declare function getSmallPet(): Fish | Bird;

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
