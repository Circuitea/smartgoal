"use client"

import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { predictGrade, Prediction } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { Info, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod"

const formSchema = z.object({
  attendance: z.number().min(0).max(100),
  participationScore: z.number().min(0).max(100),
  sleepHoursPerNight: z.number().min(0).max(24),
  stressLevel: z.number().min(1).max(10),
  studyHours: z.number().min(0).max(168),
  desiredGrade: z.number().min(0).max(4),
});

export default function Home() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attendance: 50,
      participationScore: 50,
      sleepHoursPerNight: 12,
      stressLevel: 5,
      studyHours: 168 / 2,
      desiredGrade: 0,
    },
    mode: "onBlur",
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setPrediction(null);
    predictGrade(data).then(setPrediction);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="fixed top-0 right-0 p-4">
        <ThemeModeToggle />
      </div>
      <main className="flex min-h-screen w-full grid md:grid-cols-2 gap-2 py-8 px-16 bg-white dark:bg-black sm:items-start">
        <Card className="w-full">
          <form id="study-habits" onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Your Study Habits</CardTitle>
              <CardDescription>Provide your study habits and related metrics.</CardDescription>
            </CardHeader>
            <CardContent className="my-8">
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
                          className="flex-[3]"
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
                          className="flex-[3]"
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
                          className="flex-[3]"
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
                          className="flex-[3]"
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
                          className="flex-[3]"
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
                <Controller
                  name="desiredGrade"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-attendance">Current Grade</FieldLabel>
                      <Select
                        value={String(field.value)}
                        onValueChange={(value) => form.setValue(field.name, Number(value))}
                      >
                        <SelectTrigger aria-disabled={fieldState.invalid}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Grade A</SelectItem>
                          <SelectItem value="1">Grade B</SelectItem>
                          <SelectItem value="2">Grade C</SelectItem>
                          <SelectItem value="3">Grade D</SelectItem>
                          <SelectItem value="4">Grade F</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldDescription>Your desired Grade (A, B, C, D, F)</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldSet>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">Submit</Button>
              <Button type="button" onClick={() => form.reset()} variant="outline" className="w-full">Reset</Button>
            </CardFooter>
          </form>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Predicted Grade</CardTitle>
            <CardDescription>The model has predicted your Grade from your Study Habits</CardDescription>
          </CardHeader>
          <CardContent>
            {!prediction
              ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Info />
                    </EmptyMedia>
                    <EmptyTitle>No predictions</EmptyTitle>
                    <EmptyDescription>No predictions generated</EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <span>Enter your study habits and press Submit to generate a prediction.</span>
                  </EmptyContent>
                </Empty>
              )
              : (
                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm text-gray-500">Predicted Grade</span>
                  <span className="text-2xl font-bold">{prediction.predicted_label}</span>

                  <span className="p-4">
                    {prediction.grade_recommendation === 'same'
                      ? 'Well done! You\'ve met (or exceeded) your desired grade.'
                      : 'It seems that your study habits are not allowing you to reach the grades you desire. You could do well with adjusting your study habits.'
                    }
                  </span>

                  {prediction.recommendations.attendance && (
                    <Item className="w-full" variant="outline" size="sm">
                      <ItemMedia variant="icon">
                        <Sparkles />
                      </ItemMedia>
                      <ItemContent>
                        <span>Attendance: Increase to at least {prediction.recommendations.attendance}%</span>
                      </ItemContent>
                    </Item>
                  )}
                  {prediction.recommendations.participation_score && (
                    <Item className="w-full" variant="outline" size="sm">
                      <ItemMedia variant="icon">
                        <Sparkles />
                      </ItemMedia>
                      <ItemContent>
                        <span>Participation Score: Aim for at least {prediction.recommendations.participation_score}%</span>
                      </ItemContent>
                    </Item>
                  )}
                  {prediction.recommendations.sleep_hours_per_night && (
                    <Item className="w-full" variant="outline" size="sm">
                      <ItemMedia variant="icon">
                        <Sparkles />
                      </ItemMedia>
                      <ItemContent>
                        <span>Sleep Hours: Increase sleep to {prediction.recommendations.sleep_hours_per_night}</span>
                      </ItemContent>
                    </Item>
                  )}
                  {prediction.recommendations.stress_level && (
                    <Item className="w-full" variant="outline" size="sm">
                      <ItemMedia variant="icon">
                        <Sparkles />
                      </ItemMedia>
                      <ItemContent>
                        <span>Stress Level: Reduce stress level to {prediction.recommendations.stress_level}</span>
                      </ItemContent>
                    </Item>
                  )}
                  {prediction.recommendations.study_hours_per_week && (
                    <Item className="w-full" variant="outline" size="sm">
                      <ItemMedia variant="icon">
                        <Sparkles />
                      </ItemMedia>
                      <ItemContent>
                        <span>Study Hours: Increase to {prediction.recommendations.study_hours_per_week} per week</span>
                      </ItemContent>
                    </Item>
                  )}
                </div>
              )
            }
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
