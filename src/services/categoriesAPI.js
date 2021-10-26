const URL_CATEGORIES = 'https://opentdb.com/api_category.php';

const fetchCategories = async () => {
  const getCategories = await fetch(URL_CATEGORIES);
  const response = await getCategories.json();
  return response.trivia_categories;
};

export default fetchCategories;
