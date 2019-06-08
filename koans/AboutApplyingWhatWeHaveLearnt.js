var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = _(products).filter(function(product){
        if (_(product.ingredients).any(function(ingredient){
          return ingredient === "mushrooms";
        })){
          return false;
        }
        if (product.containsNuts){
          return false;
        }
        return true;
      })

      expect(productsICanEat.length).toBe(1);

      // productsICanEat = products.filter(product => {
      //   if (product.ingredients.includes('mushrooms')){
      //     return false;
      //   }
      //   if (product.containsNuts){
      //     return false;
      //   }
      //   return true;
      // })
      // console.log(productsICanEat)
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
      /* try chaining range() and reduce() */

    var sum = _(_.range(0, 1000)).chain().reduce(function(acc, index){
      if (index % 5 === 0 || index % 3 === 0){
        return acc + index;
      }
      return acc;
    })
    .value();

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products).chain()
                .map(function(product){
                  return product.ingredients;
                })
                .flatten()
                .reduce(function(acc, cur){
                  if (ingredientCount[cur]){
                    ingredientCount[cur]++;
                  } else{
                    ingredientCount[cur] = 1;
                  }
                });


    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

    function isPrime(testNum){
      return _(_.range(2, Math.sqrt(testNum) + 1)).all(function(checkNum){
        return testNum % checkNum !== 0;
      })
    }

    function largestPrimeFactorOfComposite(num){
      if (num === 1 || num === 0 || isPrime(num)){
        return "not a composite number";
      }
      return _(_.range(3, Math.floor(num / 2 ) + 1)).reduce(function(highestPrime, cur){
        if (num % cur === 0 && isPrime(cur)){
          return highestPrime = cur;
      
        }
        return highestPrime;
      })
    }

    expect(largestPrimeFactorOfComposite(14)).toBe(7);
    expect(largestPrimeFactorOfComposite(46)).toBe(23);
    expect(largestPrimeFactorOfComposite(136)).toBe(17);
    expect(largestPrimeFactorOfComposite(1)).toBe("not a composite number");
    expect(largestPrimeFactorOfComposite(0)).toBe("not a composite number");
    expect(largestPrimeFactorOfComposite(13)).toBe("not a composite number");
  });
});

  // it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
  // });

  

//   it("should find the difference between the sum of the squares and the square of the sums", function () {
    
//   });

//   it("should find the 10001st prime", function () {

//   });

// })
