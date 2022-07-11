<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable no-undef -->
<template>
    <!-- Registration Form -->
    <div class="text-white text-center font-bold p-5 mb-4"
    v-if="reg_show_alert" :class="reg_alert_variant">
        {{ reg_alert_msg }}
    </div>
    <vee-form :validation-schema="schema"
    @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <div class="mb-3">
        <vee-field type="text" name="name" autocomplete="on"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
        transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"/>
        </div>
        <ErrorMessage class="text-red-600" name="name"></ErrorMessage>
    </div>
    <!-- Email -->
    <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <div class="mb-3">
        <vee-field type="email" name="email" autocomplete="on"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
        transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
        </div>
        <ErrorMessage class="text-red-600" name="email"></ErrorMessage>
    </div>
    <!-- Age -->
    <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <div class="mb-3">
        <vee-field type="number" name="age" autocomplete="on"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
        transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Age"/>
        </div>
        <ErrorMessage class="text-red-600" name="age"></ErrorMessage>
    </div>
    <!-- Password -->
    <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input class="block w-full py-1.5 px-3 text-gray-800 border
            border-gray-300 transition duration-500 focus:outline-none
            focus:border-black rounded" type="password"
            placeholder="Password" v-bind="field" />
        <div class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
        </div>
        </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <div class="mb-3">
        <vee-field type="password" name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
        transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" />
        </div>
        <ErrorMessage class="text-red-600" name="confirm_password"></ErrorMessage>
    </div>
    <!-- Country -->
    <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <div class="mb-3">
        <vee-field as="select" name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
        transition duration-500 focus:outline-none focus:border-black rounded">
        <option value="Romania">Romania</option>
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antartica">Antartica</option>
        </vee-field>
        </div>
        <ErrorMessage class="text-red-600" name="country"></ErrorMessage>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
        <label for="inline-block">Accept terms of service</label>
        <vee-field type="checkbox" name="tos" value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
        <ErrorMessage class="text-red-600 block" name="tos"></ErrorMessage>
    </div>
    <button type="submit" :disabled="reg_in_submission"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded
        transition hover:bg-purple-700">
        Submit
    </button>
    </vee-form>
</template>

<script>
import { auth, usersCollection } from '@/includes/firebase';

export default {
  name: 'Registerform',
  data() {
    return {
      // TODO this must be global. Move to the store
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:12|max_value:120',
        password: 'required|min:6|max:32',
        confirm_password: 'password_mismatch:@password',
        country: 'required|country_excluded:Antartica',
        tos: 'tos',
      },
      userData: {
        country: 'Romania',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your acount is been created.',
    };
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your acount is been created.';

      let userCred = null;
      try {
        userCred = await auth.createUserWithEmailAndPassword(values.email, values.password);
      } catch (e) {
        this.reg_in_submission = false;
        this.reg_alert_msg = 'bg-red-500';
        this.reg_alert_msg = e;
        return;
      }

      try {
        await usersCollection.add({
          name: values.name,
          email: values.email,
          age: values.age,
          country: values.country,
        });
      } catch (e) {
        this.reg_in_submission = false;
        this.reg_alert_msg = 'bg-red-500';
        this.reg_alert_msg = e;
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your accout was created succesfuly!';
      console.log(userCred);
    },
  },
};
</script>
