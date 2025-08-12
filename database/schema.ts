import { pgTable, uuid, text, date, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role", { enum: ["admin", "user"] }).default("user").notNull(),
  birthDate: date("birth_date"),
  gender: text("gender"),
  heightCm: numeric("height_cm", { precision: 5, scale: 2 }),
  targetWeightKg: numeric("target_weight_kg", { precision: 5, scale: 2 }),
  targetStepsPerDay: integer("target_steps_per_day"),
  targetCaloriesPerDay: integer("target_calories_per_day"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const weightLogs = pgTable("weight_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  weightKg: numeric("weight_kg", { precision: 5, scale: 2 }).notNull(),
  logDate: date("log_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const dailySteps = pgTable("daily_steps", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  logDate: date("log_date").notNull(),
  stepCount: integer("step_count"),
  distanceMeters: numeric("distance_meters", { precision: 7, scale: 2 }),
  caloriesBurned: integer("calories_burned"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const dailyCalories = pgTable("daily_calories", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  logDate: date("log_date").notNull(),
  totalCalories: integer("total_calories"),
  mealDetails: text("meal_details"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workouts = pgTable("workouts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  workoutName: text("workout_name"),
  workoutDate: date("workout_date"),
  durationMinutes: integer("duration_minutes"),
  trainingType: text("training_type"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  category: text("category"),
  muscleGroup: text("muscle_group"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const workoutExercises = pgTable("workout_exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  workoutId: uuid("workout_id").references(() => workouts.id, { onDelete: "cascade" }),
  exerciseId: uuid("exercise_id").references(() => exercises.id, { onDelete: "cascade" }),
  orderNumber: integer("order_number"),
  sets: integer("sets"),
  repetitions: integer("repetitions"),
  weightKg: numeric("weight_kg", { precision: 6, scale: 2 }),
  durationSeconds: integer("duration_seconds"),
  distanceMeters: numeric("distance_meters", { precision: 7, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  weightLogs: many(weightLogs),
  dailySteps: many(dailySteps),
  dailyCalories: many(dailyCalories),
  workouts: many(workouts),
}));

export const workoutsRelations = relations(workouts, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

export const exercisesRelations = relations(exercises, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));