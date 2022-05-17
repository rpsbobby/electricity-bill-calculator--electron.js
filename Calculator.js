class Calculator {
   constructor(numberOfDays, numberOfUnits) {
      this.numberOfDays = numberOfDays;
      this.numberOfUnits = numberOfUnits;
      this.flatRate = 0.2;
      this.vat = 0.135;
      this.standingCharges = 0.04;
      this.beforeVAT = this.calculateBeforeVAT();
      this.afterVAT = this.calculateAfterVAT();
   }

   calculateAfterVAT() {
      return 0;
   }

   calculateBeforeVAT() {
      return (
         Math.round(
            parseFloat(
               this.numberOfDays * this.standingCharges +
                  this.numberOfUnits * this.flatRate
            ) * 100
         ) / 100
      );
   }
}

module.exports = Calculator;
