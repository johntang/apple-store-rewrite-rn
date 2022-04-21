# App Store Rewrite in RN

## Procedure
1. npm install
2. npm run start:hk / npm run start:us (Just to demostrate setting env), Window do not support ENV=XXX unless I install cross-env package. On windows, please run expo start.

## App listing
### Support vertical scrolling with pagination (10 records per page) and lazy load
- Since there is no "page" parameter in the API, I have mocked an infinite scroll of ten items for each fetch. Plase refer to Utils/customHook.js -> useInfiniteTopHundrenQuery
- Useed lazy / suspense for lazy load
- Use React Memo to reduce re-render

## Search
- Use debounced value to reduce unneccessary rendering or AJAX call
- Add trim() to prevent the user accidentally added space before / after the string, toUpperCase to make it case insensitive

## Hints for Bonus

### For exceptional case handling:
1. React-Query will automatically retry.
2. You may set a failing rate in Settings to mock failing, there will be a ErrorPlaceholder in AppDetailScreen
3. An Error Alert will be prompted if there is an error
4. For poor network, please refer to Utils/request.js, the is promise race to abort if the request exceed the TIME_OUT of 3000ms.

### Show loading indicator when fetching data
- Also for slow, there is a setting of throttling which delay for a few second. Plase go to the AppDetailScreen to see the skeletons as loading indicator.

### Row scroll-ih animation 
- Shown on main list item

### Store the API response data locally with data model;
- There is an AppStoreListItemClass for data modelling
- I combined all string for search on class create to reduce calculation when filtering

### Follow the best practice of the corresponding platform;
- I have made adjustment on the Status Bar for Android

### Styling
- I useed  3 approachs for Styling
  - inline (Fast development, bad performance)
  - Stylesheet (Good performance, but need to defind a big stylesheet)
  - Styled-Component (Good performance and allow props)
- It is recommended to use either styledsheet or styled-component. But this is just for demosgtration, i will kepp the inline.

### Multi-lang Supported
- U can changed the language in SettingScreen

### DataManagement
- I useed Context API insted of Redux since it is a very simple App.
- To show I have the Redux knowledge, I used useDispatch with is similar. (You may refer to Screens/MainScreen.js)

### Error Boundary
- Sometime there may have component error, I used Top-Level Error Boundary to handle it.
- You can try to CLICK the red button to simulate the Error in setting page

### Point to note
There is a problem in the requirements that may cause a bug, lead to a bad user experience.

For the ten items pagination, in my understanding, it should be infinite scroll. However, in the API, there is no parameters call page. Although I can mock a infinite scroll by split the request into 10 per item, there will be some performance issues. (See Utils/customHook,js -> useInfiniteTopHundrenQuery)

But there is a serious problem on searching, for example if I use infinite scroll as required, I will not know the full list until I reach the 100th item. Therefore, the user cannot find the desired item unless he has reached the bottom.

There may have some workarounds:
1. Do not use infinite scroll but render the 100 items at once - could be visualised to improve the performance, meaning that giving up the pagination)
2. Use infinite scroll but replace with full list when textOnChange - there will be a big performance issue due to extra rendering (let alone the heavy loaded Animation)
3. Do not update / change the list, use auto-complete instead - however, the presentation will be different.

Also I can't find the app rating and rated number from the API. So I hard-code 3 star and 100 ppl rated

I didnt do any unit test since it is time consuming