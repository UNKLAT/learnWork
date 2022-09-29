/**
 * 享元模式（flyweight）
 * 运行共享技术有效地支持大量细粒度的对象，避免大量拥有相同
 * 内容的小类的开销，使得大家共享一个类（元类）
 * 享元模式可以避免大量非常相似类的开销，在程序设计中，
 * 有时需要生产大量细粒度的类实例来表示数据，
 * 如果能发现这些实例除了几个参数以外，开销基本相同的话，
 * 就可以大幅度较少需要实例化的类的数量。
 * 如果能把那些参数移动到类实例的外面，在方法调用的时候将他们传递进来，
 * 就可以通过共享大幅度第减少单个实例 的数目。
 * 
 * js中应用享元模式
 * 1.应用在内存里大量相似的对象上
 * 2.应用在DOM层上，享元可以用在中央事件管理器上用来避免给父容器里的每个子元素都附加事件句柄
 */

/*享元模式优化代码*/
var Book = function(title, author, genre, pageCount, publisherID, ISBN){
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.publisherID = publisherID;
  this.ISBN = ISBN;
};
// 定义基本工厂
// 让我们来定义一个基本工厂，用来检查之前是否创建该book的对象，如果有就返回，没有就重新创建并存储以便后面可以继续访问，这确保我们为每一种书只创建一个对象：

/* Book工厂 单例 */
var BookFactory = (function(){
  var existingBooks = {};
  return{
      createBook: function(title, author, genre,pageCount,publisherID,ISBN){
      /*查找之前是否创建*/
          var existingBook = existingBooks[ISBN];
          if(existingBook){
                  return existingBook;
              }else{
              /* 如果没有，就创建一个，然后保存*/
              var book = new Book(title, author, genre,pageCount,publisherID,ISBN);
              existingBooks[ISBN] =  book;
              return book;
          }
      }
  }
});
// 管理外部状态
// 外部状态，相对就简单了，除了我们封装好的book，其它都需要在这里管理：

/*BookRecordManager 借书管理类 单例*/
var BookRecordManager = (function(){
  var bookRecordDatabase = {};
  return{
      /*添加借书记录*/
      addBookRecord: function(id, title, author, genre,pageCount,publisherID,ISBN, checkoutDate, checkoutMember, dueReturnDate, availability){
          var book = bookFactory.createBook(title, author, genre,pageCount,publisherID,ISBN);
           bookRecordDatabase[id] ={
              checkoutMember: checkoutMember,
              checkoutDate: checkoutDate,
              dueReturnDate: dueReturnDate,
              availability: availability,
              book: book,

          };
      },
   updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember,     newReturnDate){
       var record = bookRecordDatabase[bookID];
       record.availability = newStatus;
       record.checkoutDate = checkoutDate;
       record.checkoutMember = checkoutMember;
       record.dueReturnDate = newReturnDate;
  },
  extendCheckoutPeriod: function(bookID, newReturnDate){
      bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
  },
  isPastDue: function(bookID){
      var currentDate = new Date();
      return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
  }
};
});