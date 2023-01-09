import { refs } from "./gallery/refs/refs";
import { coctailCardMarkup } from "./gallery/render/render";
import { fetchProductsRandom } from "./gallery/api/api";
let coctailsAmount = 0;
// переменная для идентификации кнопок коктейля
let coctailNumber = 0;
// переменная для определения типа добавляемого в избранное(коктейль или ингредиент)
let storageKey = 0;

let searchIn = 0;

const getCocktailsAmount = section => {
  if (!section) return;
  const coctailsSectionStyles = getComputedStyle(section);
  if (coctailsSectionStyles.width === '320px') {
    coctailsAmount = 3;
  } else if (coctailsSectionStyles.width === '768px') {
    coctailsAmount = 6;
  } else {
    coctailsAmount = 9;
  }
};

getCocktailsAmount(refs.coctailsSection);

export default function mainFunction(
  searchIn,
  searchLink,
  amount,
  mainMarkupPlace
) {
  if (!mainMarkupPlace) return;
  if (searchIn < 2 && mainMarkupPlace) {
    mainMarkupPlace.innerHTML = '';
  }

  for (let i = 0; i < amount; i += 1) {
    // забираем у бекенда рандомный коктейль
    fetchProductsRandom(searchLink)
      .then(newData => {
        if (searchIn === 1) {
          fetchProductsRandom(searchLink).then(newData => {
            coctailsAmount = newData.drinks.length;
          });
        }

        // увеличиваем счетчик коклейлей на 1
        coctailNumber += 1;
        let coctailIterationNumber = 0;

        if (searchIn) {
          coctailIterationNumber = i;
        }
        const { strDrinkThumb = '', strDrink = '' } =
          newData.drinks[coctailIterationNumber];

        // создаем разметку карточки
        coctailCardMarkup(mainMarkupPlace, strDrink, strDrinkThumb);
      }).catch(alert.log);
    
  }
 
}
mainFunction(
  0,
  'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  coctailsAmount,
  refs.coctailsList
);