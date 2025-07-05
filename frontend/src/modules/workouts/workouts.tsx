import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dumbbell, Clock, Target, PlayCircle, Zap, Flame, Timer, Search } from "lucide-react";

const Workouts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const personalizedPlans = [
    {
      id: 1,
      title: "Beginner Strength Building",
      description: "Perfect for building foundational strength with bodyweight and light weights",
      duration: "4 weeks",
      workoutsPerWeek: 3,
      difficulty: "Beginner",
      category: "Strength",
      progress: 45,
      image: "🏋️",
    },
    {
      id: 2,
      title: "HIIT Fat Burner",
      description: "High-intensity interval training for maximum calorie burn",
      duration: "6 weeks",
      workoutsPerWeek: 4,
      difficulty: "Intermediate",
      category: "Cardio",
      progress: 20,
      image: "🔥",
    },
    {
      id: 3,
      title: "Flexibility & Mobility",
      description: "Daily stretching and mobility routines for better movement",
      duration: "8 weeks",
      workoutsPerWeek: 5,
      difficulty: "All Levels",
      category: "Flexibility",
      progress: 70,
      image: "🧘",
    },
  ];

  const quickWorkouts = [
    {
      id: 1,
      title: "15-Minute Morning Energizer",
      duration: "15 min",
      category: "Full Body",
      difficulty: "Beginner",
      equipment: "None",
      calories: "120-150",
      exercises: ["Jumping Jacks", "Push-ups", "Squats", "Plank", "Burpees"],
    },
    {
      id: 2,
      title: "Lunch Break HIIT",
      duration: "20 min",
      category: "HIIT",
      difficulty: "Intermediate",
      equipment: "None",
      calories: "180-220",
      exercises: ["Mountain Climbers", "Jump Squats", "Push-ups", "High Knees", "Plank Jacks"],
    },
    {
      id: 3,
      title: "Evening Strength Circuit",
      duration: "25 min",
      category: "Strength",
      difficulty: "Intermediate",
      equipment: "Dumbbells",
      calories: "200-250",
      exercises: ["Dumbbell Squats", "Chest Press", "Bent-over Rows", "Shoulder Press", "Deadlifts"],
    },
    {
      id: 4,
      title: "Yoga Flow for Flexibility",
      duration: "30 min",
      category: "Yoga",
      difficulty: "All Levels",
      equipment: "Yoga Mat",
      calories: "100-140",
      exercises: ["Sun Salutation", "Warrior Poses", "Triangle Pose", "Child's Pose", "Savasana"],
    },
  ];

  const workoutLibrary = [
    {
      id: 1,
      title: "Upper Body Strength",
      duration: "45 min",
      category: "Strength",
      difficulty: "Intermediate",
      targetMuscles: ["Chest", "Back", "Shoulders", "Arms"],
      equipment: ["Dumbbells", "Pull-up Bar"],
    },
    {
      id: 2,
      title: "Lower Body Power",
      duration: "40 min",
      category: "Strength",
      difficulty: "Advanced",
      targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
      equipment: ["Dumbbells", "Resistance Bands"],
    },
    {
      id: 3,
      title: "Core Crusher",
      duration: "20 min",
      category: "Core",
      difficulty: "Intermediate",
      targetMuscles: ["Abs", "Obliques", "Lower Back"],
      equipment: ["None"],
    },
    {
      id: 4,
      title: "Cardio Dance Party",
      duration: "35 min",
      category: "Cardio",
      difficulty: "Beginner",
      targetMuscles: ["Full Body"],
      equipment: ["None"],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const filteredWorkouts = workoutLibrary.filter((workout) => {
    const matchesSearch =
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || workout.category.toLowerCase() === selectedCategory;
    const matchesDuration =
      selectedDuration === "all" ||
      (selectedDuration === "short" && parseInt(workout.duration) <= 30) ||
      (selectedDuration === "medium" && parseInt(workout.duration) > 30 && parseInt(workout.duration) <= 45) ||
      (selectedDuration === "long" && parseInt(workout.duration) > 45);

    return matchesSearch && matchesCategory && matchesDuration;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Workout Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized fitness plans, quick workouts, and a comprehensive exercise library
          </p>
        </div>

        <Tabs defaultValue="personalized" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personalized">Personalized Plans</TabsTrigger>
            <TabsTrigger value="quick">Quick Workouts</TabsTrigger>
            <TabsTrigger value="library">Exercise Library</TabsTrigger>
          </TabsList>

          <TabsContent value="personalized" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalizedPlans.map((plan) => (
                <Card key={plan.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">{plan.image}</div>
                      <Badge className={getDifficultyColor(plan.difficulty)}>{plan.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {plan.duration} • {plan.workoutsPerWeek} workouts/week
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Target className="w-4 h-4 mr-2" />
                        {plan.category}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{plan.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-wellness-gradient h-2 rounded-full transition-all duration-300"
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button className="w-full bg-wellness-gradient">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Continue Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Quick Workouts</h2>
              <p className="text-gray-600">Perfect for busy schedules - get effective workouts in minimal time</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickWorkouts.map((workout) => (
                <Card key={workout.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="flex items-center">
                        <Timer className="w-3 h-3 mr-1" />
                        {workout.duration}
                      </Badge>
                      <Badge className={getDifficultyColor(workout.difficulty)}>{workout.difficulty}</Badge>
                    </div>
                    <CardTitle>{workout.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-2 text-blue-500" />
                        {workout.category}
                      </div>
                      <div className="flex items-center">
                        <Dumbbell className="w-4 h-4 mr-2 text-green-500" />
                        {workout.equipment}
                      </div>
                      <div className="flex items-center">
                        <Flame className="w-4 h-4 mr-2 text-red-500" />
                        {workout.calories} cal
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                        {workout.exercises.length} exercises
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-wellness-gradient">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Workout
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>{workout.title}</DialogTitle>
                          <DialogDescription>Workout details and exercise list</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>Duration: {workout.duration}</div>
                            <div>Difficulty: {workout.difficulty}</div>
                            <div>Equipment: {workout.equipment}</div>
                            <div>Calories: {workout.calories}</div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Exercises:</h4>
                            <ul className="space-y-1">
                              {workout.exercises.map((exercise, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                  {index + 1}. {exercise}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button className="w-full bg-wellness-gradient">Begin Workout</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search workouts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">Short (≤30 min)</SelectItem>
                  <SelectItem value="medium">Medium (30-45 min)</SelectItem>
                  <SelectItem value="long">Long ({">"}45 min)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout) => (
                <Card key={workout.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{workout.category}</Badge>
                      <Badge className={getDifficultyColor(workout.difficulty)}>{workout.difficulty}</Badge>
                    </div>
                    <CardTitle>{workout.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {workout.duration}
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Target Muscles:</div>
                        <div className="flex flex-wrap gap-1">
                          {workout.targetMuscles.map((muscle, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Equipment:</div>
                        <div className="flex flex-wrap gap-1">
                          {workout.equipment.map((equip, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {equip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-wellness-gradient">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Workout
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Workouts;
