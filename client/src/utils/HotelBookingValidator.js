import Person from "./Person";

class HotelBookingValidation {
    constructor(persons) {
        this.persons = persons.map((p) => new Person(p.name, p.phone, p.aadhar, p.gender,p.errors));
        // this.errors = new Array(this.persons.length).fill({}); // ✅ Initialize errors for all persons
        // console.log(this.persons, "checking the persons");
        // console.log(this.errors,"errors inside the validation constructor")
    }

    validateAll() {
        this.errors = this.persons.map((person) => {
            person.validate();
            return { ...this.errors,...person.errors }; // ✅ Ensure we create a new object instead of reference
        });
        return this.errors.every((error) => Object.keys(error).length === 0);
    }

    validatePerson(index) {
        // console.log("inside the validate persons name ", index);
        // console.log(this.persons[index], "checking the person in the single validate");
    
        if (this.persons[index]) {
            // console.log("inside the this.validatePerson");
            // console.log("ready");
    
            // Validate the specific person and get their errors
            const isValid = this.persons[index].validate();
    
            // ✅ Only update the errors for the specific person
            this.persons = this.persons.map((person, i) => 
                i === index ? { ...person, errors: isValid } : person
            );
    
            // console.log(isValid, "isvalid ");
            // console.log(this.persons[index]?.errors, "error inside the person class");
            // console.log(this.persons, "person whole valueeeeeeeee");
    
            return this.persons;
        }
        return this.persons;
    }
    
}

export default HotelBookingValidation;
