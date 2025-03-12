class Person {
    constructor(name,phone, aadhar, gender,errors) {
        this.name = name || "";
        this.phone = phone || "";
        this.aadhar = aadhar || "";
        this.gender = gender || "";

        this.errors = errors|| {};

        
    }

    validate() {
      console.log("inside the validate function")
      this.errors = {}; // Reset errors each time
  
      if (!this.name.trim()) {
          this.errors.name = "Name is required";
      } else if (!/^[a-zA-Z\s]+$/.test(this.name)) {
          this.errors.name = "Name must contain only letters";
      }
  
      if (!this.gender) {
          this.errors.gender = "Gender is required";
      }
  
      if (!this.aadhar) {
          this.errors.aadhar = "Aadhar is required";
      } else if (!/^\d{12}$/.test(this.aadhaar)) {
          this.errors.aadhar = "Aadhar must be exactly 12 digits and contain only numbers";
      }
  
      if (!this.phone) {
          this.errors.phone = "Phone is required";
      } else if (!/^\d{10}$/.test(this.phone)) {
          this.errors.phone = "Phone must be exactly 10 digits and contain only numbers";
      }
  
      console.log(this.errors, "checking inside the person class new function");
      
      // ✅ Ensure we return `this.errors` instead of true/false
      return this.errors;  
  }
  




}


export default Person;