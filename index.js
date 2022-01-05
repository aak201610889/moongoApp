const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/employees', {
  useNewUrlParser: true
}).then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));
const employeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
    min:[ 18,'to small age'],
    max:[ 60,'to old age'],
  },
  department: {
    type: [String],
    //type:String,enum:[''IT','HR','Sales'], THIS FOR FORC CHOSSE THIS VALUE
    required: true,
  },
  date: {
    type: Date,
    default: Date.now

  }
  ,
  isApproved: {
    type: Boolean
  }
});


const Employee = mongoose.model('Employee', employeesSchema);

const addEmployee = async () => {
  const foad = new Employee({
    name: 'AOBAI',
    age: 40,
    department: [ 'HR','IT' ],
    isApproved: true
  })
  try {
    const result = await foad.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
// addEmployee();
const getEmployee = async()=> { 
  const employee = await Employee
    .find(
      // { name: "ali" }
      // { age: {$gte:28}}
      { age: { $nin:[30,20]}}//not in
  ).sort({ name: -1 })
    .select({name:1,age:1}).limit(2)
    ;
  console.log(employee);
}
const updateEmployee = async (id) => { 
  const employee = await Employee.findById(id);
  if (!employee) { console.log('employee not found'); }
  employee.age = 55
  const result = await employee.save()
  console.log(result+'result updated successfull');
}

// updateEmployee('61d5f31c1acf9bb1ff0f33f8')
// //61d5f31c1acf9bb1ff0f33f8
// getEmployee()

const updateEmployeeAnotherWay = async (id) => { 
  const employee = await Employee.findByIdAndUpdate(
    { _id: id },
    {
      $set: { age: 63, name: "fofo" },
    },
    { new: true }
  );
  console.log('updated successful');
}
//updateEmployeeAnotherWay("61d5f31a7ef0cebd85941061");

const deleteEmployee = async (id) => { 
  const employee =await Employee.findByIdAndRemove(id)
  console.log('employee deleted');
}

// deleteEmployee("61d5f31c1acf9bb1ff0f33f8");
