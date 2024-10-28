"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const FormSchema = z.object({
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender"
  }),
  age: z.number({
    required_error: "Please enter your age"
  }).nonnegative(),
  hypertension: z.enum(["yes", "no"], {
    required_error: "Please select an option"
  }),

  heart_disease: z.enum(["yes", "no"], {
    required_error: "Please select an option"
  }),
  ever_married: z.enum(["yes", "no"], {
    required_error: "Please select an option"
  }),
  residence_type: z.enum(["urban", "rural"], {
    required_error: "Please select an option"
  }),
  avg_glucose_level: z.number({
    required_error: "Please enter your average glucose levels"
  }).nonnegative(),

  bmi: z.number({
    required_error: "Please enter your average glucose levels"
  }).nonnegative(),
  smoking_status: z.enum(["never", "formerly", "smokes"], {
    required_error: "Please select an option"
  }),
  work_type: z.enum(["govt", "never", "private", "self", "children"], {
    required_error: "Please select an option"
  }),
})

export default function MyForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const [loaded, setLoaded] = useState(false)
  const [response, setResponse] = useState(null)


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    try{
      const response1 = await axios.post('http://127.0.0.1:8000/predict', {
          gender: data.gender,
          age: data.age, 
          hypertension: data.hypertension,
          heart_disease: data.heart_disease,
          ever_married: data.ever_married,
          residence_type: data.residence_type,
          avg_glucose_level: data.avg_glucose_level,
          bmi: data.bmi,
          smoking_status: data.smoking_status,
          work_type: data.work_type,
      })
      setLoaded(true)
      console.log(response1.data)
      setResponse(response1.data)
    } catch (e){
      console.log("Error: ", e)
    }
  }


  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* Field for gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Please select your biological gender assigned at birth: </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Female
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Field for age */}
        <FormField 
          control = {form.control}
          name="age"
          render = {({ field }) => (
            <FormItem>
              <FormLabel>Your age</FormLabel>
              <FormControl>
                <Input type="number" onChange={(e) => field.onChange(Number(e.target.value))}  className="w-15"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hypertension */}
          <FormField 
            control = {form.control}
            name = "hypertension"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Do you have issues related to hypertension?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        {/* Heart disease*/}
        <FormField 
            control = {form.control}
            name = "heart_disease"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Do you have issues related to heart, including heart diseases?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ever married */}
          <FormField 
            control = {form.control}
            name = "ever_married"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Have you ever had a marriage till date?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* residence type */}
          <FormField 
            control = {form.control}
            name = "residence_type"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Is you residence based in a rural or urban area?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="rural" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Rural
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="urban" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Urban
                    </FormLabel>
                  </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Glucose */}
        <FormField 
          control = {form.control}
          name="avg_glucose_level"
          render = {({ field }) => (
            <FormItem>
              <FormLabel>What was your average glucose level</FormLabel>
              <FormControl>
                <Input type="number" step="any" onChange={(e) => field.onChange(parseFloat(e.target.value))}  className="w-15"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          {/* Glucose */}
        <FormField 
          control = {form.control}
          name="bmi"
          render = {({ field }) => (
            <FormItem>
              <FormLabel>What is your Body Mass Index ?</FormLabel>
              <FormControl>
                <Input type="number" step="any" onChange={(e) => field.onChange(parseFloat(e.target.value))}  className="w-15"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* Smoking status */}
      <FormField 
            control = {form.control}
            name = "smoking_status"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>What would you describe as your smoking status?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="never" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Never Smoked
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="formerly" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Formerly Smoked
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="smokes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Smokes
                    </FormLabel>
                  </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

      {/* Work type */}
      <FormField 
            control = {form.control}
            name = "work_type"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Finally, which of the following best describes your work?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                    >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="never" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Never worked
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="govt" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Works in or for the government
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Works in the private sector
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="self" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Is self employed
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="children" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      In a field related to children, including home makers
                    </FormLabel>
                  </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    <div hidden={!loaded}>
      <div className="text text-5xl border-l-4 border-t-10">Here are your results: </div>
      {response ? JSON.stringify(response.message) : "null"}
    </div>
    </div>
  )
}
