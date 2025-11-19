"use client"

import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"

const formSchema = z.object({
  attendance: z.number().min(0).max(100),
  participationScore: z.number().min(0).max(100),
  sleepHoursPerNight: z.number().min(0).max(24),
  stressLevel: z.number().min(1).max(10),
  studyHours: z.number().min(1).max(168),
});

export default function Home() {
  useEffect(() => {
    console.log(form.getValues())
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendance: 50,
      participationScore: 50,
      sleepHoursPerNight: 12,
      stressLevel: 5,
      studyHours: 168 / 2,
    },
    mode: "onBlur",
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="absolute top-0 right-0 p-4">
        <ThemeModeToggle />
      </div>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-8 px-16 bg-white dark:bg-black sm:items-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Study Habits</CardTitle>
            <CardDescription>Provide your study habits and related metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="study-habits">
              <FieldSet>
                <Controller
                  name="attendance"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-attendance">Attendance</FieldLabel>
                      <div className="flex flex-row gap-2">
                        <Slider
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                          className="flex-[4]"
                          aria-invalid={fieldState.invalid}
                          min={0}
                          max={100}
                        />
                        <InputGroup className="flex-[1]">
                          <InputGroupInput
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => form.setValue(field.name, Number(e.target.value))}
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="inline-end">
                            <span>%</span>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <FieldDescription>The percentage of classes you have attended.</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="participationScore"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-attendance">Participation Score</FieldLabel>
                      <div className="flex flex-row gap-2">
                        <Slider
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                          className="flex-[4]"
                          aria-invalid={fieldState.invalid}
                          min={0}
                          max={100}
                        />
                        <InputGroup className="flex-[1]">
                          <InputGroupInput
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => form.setValue(field.name, Number(e.target.value))}
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="inline-end">
                            <span>%</span>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <FieldDescription>The score you were given for class participation.</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="sleepHoursPerNight"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-attendance">Sleep Hours Per Night</FieldLabel>
                      <div className="flex flex-row gap-2">
                        <Slider
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                          className="flex-[4]"
                          aria-invalid={fieldState.invalid}
                          min={0}
                          max={24}
                        />
                        <InputGroup className="flex-[1]">
                          <InputGroupInput
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => form.setValue(field.name, Number(e.target.value))}
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="inline-end">
                            <span>hours</span>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <FieldDescription>The number of hours of sleep you get every night.</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="stressLevel"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-attendance">Stress Level</FieldLabel>
                      <div className="flex flex-row gap-2">
                        <Slider
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                          className="flex-[4]"
                          aria-invalid={fieldState.invalid}
                          min={1}
                          max={10}
                        />
                        <InputGroup className="flex-[1]">
                          <InputGroupInput
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => form.setValue(field.name, Number(e.target.value))}
                            aria-invalid={fieldState.invalid}
                          />
                        </InputGroup>
                      </div>
                      <FieldDescription>The amount of stress you feel, with 1 being low and 10 being high.</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="studyHours"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-attendance">Study Hours</FieldLabel>
                      <div className="flex flex-row gap-2">
                        <Slider
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                          className="flex-[4]"
                          aria-invalid={fieldState.invalid}
                          min={0}
                          max={168}
                        />
                        <InputGroup className="flex-[1]">
                          <InputGroupInput
                            {...field}
                            type="number"
                            value={field.value}
                            onChange={(e) => form.setValue(field.name, Number(e.target.value))}
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="inline-end">
                            <span>hours</span>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <FieldDescription>The number of hours you spend studying every week.</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldSet>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full">Submit</Button>
            <Button onClick={() => form.reset()} variant="outline" className="w-full">Reset</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
