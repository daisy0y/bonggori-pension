/**
 * Init firebase database settings
 *
 * REQUIREMENT: firebase-admin (npm install --save-dev firebase-admin)
 *
 * WARNING: execution of this file will reset your database.
 *          If you have important data in the database, don't run this file.
 *
 * SECURITY ALERT: DO NOT UPLOAD YOUR """SECRET.json""" file to git repository
 *                 Only use your secret file in local repository
 */
const admin = require('firebase-admin');

// firebase console > project settings > service account > create new service account
// https://console.firebase.google.com/project/{your project id}/settings/serviceaccounts/adminsdk
var serviceAccount = require('./firebase_secret.json'); // your secret path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
});

const firestore = admin.firestore();

////////////////////
// general functions
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

const getDatas = collection =>
  new Promise((resolve, reject) => {
    firestore
      .collection(collection)
      .get()
      .then(snapshot => {
        const datas = [];
        snapshot
          .forEach(doc => datas.push(doc))
          .then(resolve(datas))
          .catch(e => reject(e));
      })
      .catch(e => reject(e));
  });

const setData = (collection, doc, data) =>
  new Promise((resolve, reject) => {
    firestore
      .collection(collection)
      .doc(doc)
      .set(data)
      .then(resolve(true))
      .catch(e => reject(e));
  });

const updateData = (collection, doc, data) =>
  new Promise((resolve, reject) => {
    firestore
      .collection(collection)
      .doc(doc)
      .update(data)
      .then(resolve(true))
      .catch(e => reject(e));
  });

const deleteData = (collection, doc) =>
  new Promise((resolve, reject) => {
    firestore
      .collection(collection)
      .doc(doc)
      .delete()
      .then(resolve(true))
      .catch(e => reject(e));
  });

// delete add docs in collection
const deleteAllDocs = collection =>
  new Promise((resolve, reject) => {
    const ref = firestore.collection(collection);
    ref
      .get()
      .then(snapshot => snapshot.forEach(doc => ref.doc(doc.id).delete()))
      .then(resolve(true))
      .catch(e => reject(e));
  });

// get last number id of collection
const getLastId = (collection, id_field_name) =>
  new Promise((resolve, reject) => {
    const ref = firestore.collection(collection);
    ref
      .orderBy(id_field_name, 'desc')
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) resolve(-1);
        resolve(parseInt(snapshot.docs[0].id));
      })
      .catch(e => reject(e));
  });

////////////////////
// create databases
const create_user_role = (role_name, role_id) =>
  new Promise((resolve, reject) => {
    setData('userRoles', role_name, {
      roleId: role_id,
      roleName: role_name,
    })
      .then(resolve(role_id + 1))
      .catch(e => reject(e));
  });

const create_user = (user_name, user_email, user_phone, user_role, user_id) =>
  new Promise((resolve, reject) => {
    setData('users', user_email, {
      userId: user_id,
      userName: user_name,
      userEmail: user_email,
      userPhone: user_phone,
      userRole: firestore.doc(`userRoles/${user_role}`),
    })
      .then(resolve(user_id + 1))
      .catch(e => reject(e));
  });

const create_board = (title, content, writer_email, created, board_id) =>
  new Promise((resolve, reject) => {
    setData('boards', `${board_id}`, {
      boardId: board_id,
      boardTitle: title,
      boardContent: content,
      writer: firestore.doc(`users/${writer_email}`),
      created: created,
    })
      .then(resolve(board_id + 1))
      .catch(e => reject(e));
  });

const create_answer = (board_id, content, created, answer_id) =>
  new Promise((resolve, reject) => {
    setData('answers', `${answer_id}`, {
      answerId: answer_id,
      board: firestore.doc(`boards/${board_id}`),
      answerContent: content,
      created: created,
    })
      .then(resolve(answer_id + 1))
      .catch(e => reject(e));
  });

const create_room_type = (room_type_name, thumbnail, room_type_id) =>
  new Promise((resolve, reject) => {
    setData('roomTypes', room_type_name, {
      roomTypeId: room_type_id,
      roomTypeName: room_type_name,
      thumbnail: thumbnail,
    })
      .then(resolve(room_type_id + 1))
      .catch(e => reject(e));
  });

const create_room = (
  room_name,
  room_type,
  price,
  square_feet,
  personnel_default,
  personnel_limit,
  options,
  room_desc,
  room_images,
  room_id,
) =>
  new Promise((resolve, reject) => {
    setData('rooms', room_name, {
      roomId: room_id,
      roomName: room_name,
      roomType: firestore.doc(`roomTypes/${room_type}`),
      price: price,
      squareFeet: square_feet,
      personnelDefault: personnel_default,
      personnelLimit: personnel_limit,
      options: options,
      roomDesc: room_desc,
      roomImages: room_images,
    })
      .then(resolve(room_id + 1))
      .catch(e => reject(e));
  });

const create_book = (
  adult_count,
  children_count,
  room_id,
  room_type,
  booker_email,
  payment,
  price,
  discount,
  start,
  end,
  is_visited,
  book_id,
) =>
  new Promise((resolve, reject) => {
    // TODO: create book id using uuid or random token generator

    setData('books', `${book_id}`, {
      bookId: book_id,
      adultCount: adult_count,
      childrenCount: children_count,
      room: firestore.doc(`rooms/${room_id}`),
      roomType: firestore.doc(`roomType/${room_type}`),
      booker: firestore.doc(`users/${booker_email}`),
      paymentMethod: payment,
      bookNumber: 'please create random book number',
      price: price,
      discount: discount,
      periodStart: start,
      periodEnd: end,
      isVisited: is_visited,
    });
  });

const create_review = (room_id, book_id, writer_email, content, rating, is_blocked, review_id) =>
  new Promise((resolve, reject) => {
    setData('reviews', `${review_id}`, {
      reviewId: review_id,
      room: firestore.doc(`rooms/${room_id}`),
      writer: firestore.doc(`users/${writer_email}`),
      bookId: firestore.doc(`books/${book_id}`),
      content: content,
      starRate: rating,
      isBlocked: is_blocked,
    })
      .then(resolve(review_id + 1))
      .catch(e => reject(e));
  });

////////////////////
// initialize functions
const init_collection = (collection, callback) =>
  new Promise(async (resolve, reject) => {
    try {
      let delete_result = await deleteAllDocs(collection);
      await sleep(1000);
      await callback();
      resolve(true);
    } catch (e) {
      console.log(`Error occurred during creating ${collection}`);
      console.log(e);
      resolve(false);
    }
  });

async function initializeFireStore() {
  // TODO: firebaseSetting.ts ?????? ?????? ????????? ????????? ???????????? ?????? ?????? ????????? ??????
  console.log('FireStore initialize result');

  /**
   * collection ??????: userRoles
   * ?????? ??????: roleId (Number, auto increment)
   * ??????: {
   *   roleId, roleName
   * }
   * ??????: ?????? ?????? (?????????, ?????? ?????? ???)
   */
  const user_roles_create_result = await init_collection('userRoles', async () => {
    let role_id = (await getLastId('userRoles', 'roleId')) + 1;
    role_id = await create_user_role('ADMIN', role_id);
    sleep(1);
    role_id = await create_user_role('USER', role_id);
    sleep(1);
  });
  console.log(`userRoles: ${user_roles_create_result}`);

  /**
   * collection ??????: users
   * ?????? ??????: userEmail (String)
   * ??????: {
   *   userName, userEmail, userPhone, userRole, userId(Number, auto increment)
   * }
   * ??????: ????????? ??????
   * ????????? ????????? ??? ?????? ??????: profile_img, address, is_blocked, created_at(registered_at), edited_at
   */
  const users_create_result = await init_collection('users', async () => {
    let user_id = (await getLastId('users', 'userId')) + 1;
    user_id = await create_user('?????????', 'poil_chxn@naver.com', '01086852801', 'ADMIN', user_id);
    sleep(1);
  });
  console.log(`users: ${users_create_result}`);

  /**
   * collection ??????: boards
   * ?????? ??????: boardId (Number, auto increment)
   * ??????: {
   *   boardId, boardTitle, boardContent, writer, created
   * }
   * ??????: ????????? (??????)
   * ????????? ????????? ??? ?????? ??????: board_imgs, edited_at, is_blocked
   */
  const boards_create_result = await init_collection('boards', async () => {
    let board_id = (await getLastId('boards', 'boardId')) + 1;
    board_id = await create_board(
      '?????? ????????? ?????? ????????????.',
      '?????? ????????? ?????? ????????? ??? ??? ?????????????',
      'poil_chxn@naver.com',
      new Date('2021-08-11'),
      board_id,
    );
    sleep(1);
  });
  console.log(`board: ${boards_create_result}`);

  /**
   * collection ??????: answers
   * ?????? ??????: answerId (Number, auto increment)
   * ??????: {
   *   answerId, board, answerContent, created
   * }
   * ??????: ?????? ?????????
   * ????????? ????????? ??? ?????? ??????: answer_title, answer_imgs, like_count, dislike_count, edited_at
   */
  const answers_create_result = await init_collection('answers', async () => {
    let answer_id = (await getLastId('answers', 'answerId')) + 1;
    answer_id = await create_answer(
      0,
      '????????? ?????? ????????? ?????? ?????? ????????? ???????????? ??????????????????.',
      new Date('2021-08-12'),
      answer_id,
    );
    sleep(1);
  });
  console.log(`answers: ${answers_create_result}`);

  /**
   * collection ??????: roomTypes
   * ?????? ??????: roomTypeName (String)
   * ??????: {
   *   roomTypeId, roomTypeName, thumbnail
   * }
   * ??????: ??? ??????
   */
  const room_types_create_result = await init_collection('roomTypes', async () => {
    let room_type_id = (await getLastId('roomTypes', 'roomTypeId')) + 1;
    room_type_id = await create_room_type(
      '??????',
      'https://cdn.pixabay.com/photo/2014/07/10/17/17/hotel-389256_960_720.jpg',
      room_type_id,
    );
    sleep(1);
    room_type_id = await create_room_type('??????', '', room_type_id);
    sleep(1);
    room_type_id = await create_room_type('??????', '', room_type_id);
    sleep(1);
  });
  console.log(`roomTypes: ${room_types_create_result}`);

  /**
   * collection ??????: rooms
   * ?????? ??????: roomName (String)
   * ??????: {
   *   roomId, roomName, roomType, price, squareFeet, personnelDefault, personnelLimit, options, roomDesc, roomImages
   * }
   * ??????: ???
   */
  const rooms_create_result = await init_collection('rooms', async () => {
    const options = ['?????????', '?????????', '?????????', '?????????', '?????????', '????????????'];
    const options2 = ['?????????', '?????????', '?????????', '?????????'];
    const options3 = ['?????????', '?????????', '?????????', '????????????'];
    const options4 = ['?????????', '?????????', '?????????', '????????????'];

    const images = [
      'https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_960_720.jpg',
      'https://cdn.pixabay.com/photo/2019/08/19/13/58/bed-4416515_960_720.jpg',
      'https://cdn.pixabay.com/photo/2018/06/14/21/15/the-interior-of-the-3475656_960_720.jpg',
    ];
    const images2 = [
      'https://cdn.pixabay.com/photo/2018/02/24/17/17/window-3178666_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg',
    ];
    const images3 = [
      'https://cdn.pixabay.com/photo/2016/12/11/18/10/apartment-1899964_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/02/19/10/01/hotel-1209021_1280.jpg',
      'https://cdn.pixabay.com/photo/2018/06/14/21/15/the-interior-of-the-3475656_960_720.jpg',
    ];
    const images4 = ['https://cdn.pixabay.com/photo/2016/03/02/20/41/hotel-1233020_1280.jpg'];

    let room_id = (await getLastId('rooms', 'roomId')) + 1;
    room_id = await create_room('?????? ?????????', '??????', 21000, 10, 3, 4, options, '????????? ?????? ?????????', images, room_id);
    sleep(1);
    room_id = await create_room(
      '?????? ?????????',
      '??????',
      33000,
      20,
      3,
      5,
      options2,
      '????????? ?????? ?????????',
      images2,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '?????? ?????????',
      '??????',
      54000,
      30,
      4,
      6,
      options4,
      '????????? ?????? ?????????',
      images,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '????????? ?????????',
      '??????',
      72000,
      40,
      3,
      7,
      options,
      '????????? ????????? ?????????',
      images3,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '????????? ?????????',
      '??????',
      62000,
      50,
      5,
      8,
      options4,
      '????????? ????????? ?????????',
      images4,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '????????? ?????????',
      '??????',
      89000,
      40,
      4,
      5,
      options2,
      '????????? ????????? ?????????',
      images2,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '?????? ?????????',
      '??????',
      21000,
      10,
      3,
      5,
      options3,
      '????????? ?????? ?????? ???',
      images3,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '?????? ?????????',
      '??????',
      44000,
      20,
      3,
      4,
      options2,
      '????????? ?????? ?????? ???',
      images2,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '?????? ?????????',
      '??????',
      56000,
      30,
      3,
      8,
      options,
      '????????? ?????? ?????? ???',
      images,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '????????? ?????????',
      '??????',
      62000,
      40,
      2,
      3,
      options4,
      '????????? ?????? ????????? ???',
      images4,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '????????? ?????????',
      '??????',
      83000,
      50,
      3,
      6,
      options4,
      '????????? ?????? ????????? ???',
      images3,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '?????? ?????????',
      '??????',
      21000,
      10,
      3,
      4,
      options2,
      '????????? ?????? ?????? ???',
      images3,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '?????? ?????????',
      '??????',
      34000,
      20,
      4,
      7,
      options3,
      '????????? ?????? ?????? ???',
      images,
      room_id,
    );
    sleep(1);
    room_id = await create_room(
      '????????? ?????????',
      '??????',
      52000,
      30,
      5,
      9,
      options4,
      '????????? ?????? ????????? ???',
      images4,
      room_id,
    );
    sleep(1);
  });
  console.log(`rooms: ${rooms_create_result}`);

  /**
   * collection ??????: books
   * ?????? ??????: bookId (Number, auto increment)   => WILL_CHANGE: change to auto generate token or uuid
   * ??????: {
   *   bookId, adultCount, childrenCount, room, roomType, booker, paymentMethod, bookNumber, price, discount,
   *   periodStart, periodEnd, isVisited
   * }
   * ??????: ??????
   */
  const books_create_result = await init_collection('books', async () => {
    let book_id = (await getLastId('books', 'bookId')) + 1;
    book_id = await create_book(
      1,
      1,
      '?????? ?????????',
      '??????',
      'poil_chxn@naver.com',
      'CARD',
      21000,
      30,
      new Date('2021-08-20'),
      new Date('2021-08-23'),
      true,
      book_id,
    );
    sleep(1);
  });
  console.log(`books: ${books_create_result}`);

  /**
   * collection ??????: reviews
   * ?????? ??????: reviewId (Number, auto increment)
   * ??????: {
   *   reviewId, room, writer, bookId, content, starRate, isBlocked
   * }
   * ??????: ????????????
   */
  const reviews_create_result = init_collection('rooms', async () => {
    let review_id = (await getLastId('reviews', 'reviewId')) + 1;
    review_id = await create_review(
      '?????? ?????????',
      0,
      'poil_chxn@naver.com',
      '?????? ?????? ???????????????!! ??? ?????? ??????~',
      4.5,
      false,
      review_id,
    );
  });
  console.log(`reviews: ${reviews_create_result}`);
}

initializeFireStore();
