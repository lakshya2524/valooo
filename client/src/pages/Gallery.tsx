import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Sparkles, X, ImagePlus, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingHearts } from "@/components/FloatingHearts";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { imageCategories } from "@shared/routes";
import type { Image } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryEmojis: Record<string, string> = {
  cute: "🥰",
  baddie: "😈",
  beautiful: "✨",
  sanskari: "🙏",
};

const categoryColors: Record<string, string> = {
  cute: "from-pink-400 to-rose-400",
  baddie: "from-purple-500 to-indigo-500",
  beautiful: "from-amber-400 to-orange-400",
  sanskari: "from-emerald-400 to-teal-400",
};

export default function Gallery() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCategory, setNewImageCategory] = useState<string>("");

  const { data: images = [], isLoading } = useQuery<Image[]>({
    queryKey: ["/api/images"],
  });

  const addImage = useMutation({
    mutationFn: async (data: { url: string; category: string }) => {
      return apiRequest("POST", "/api/images", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      setIsAddOpen(false);
      setNewImageUrl("");
      setNewImageCategory("");
      toast({
        title: "Photo added!",
        description: "Amrit's gallery just got better!",
      });
    },
    onError: () => {
      toast({
        title: "Oops!",
        description: "Couldn't add the photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteImage = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/images/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/images"] });
      toast({
        title: "Photo removed",
        description: "The photo has been removed from the gallery.",
      });
    },
  });

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const handleAddImage = () => {
    if (!newImageUrl.trim() || !newImageCategory) {
      toast({
        title: "Missing info",
        description: "Please provide both a URL and category.",
        variant: "destructive",
      });
      return;
    }
    addImage.mutate({ url: newImageUrl, category: newImageCategory });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <FloatingHearts />
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto z-10 relative"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 mb-4"
          >
            Amrit's Gallery
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-medium"
          >
            All the beautiful moments captured
          </motion.p>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-2"
          >
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <span className="text-sm text-pink-500 font-semibold">My Valentine Forever</span>
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="rounded-full"
            data-testid="filter-all"
          >
            All
          </Button>
          {imageCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full capitalize ${selectedCategory === category ? `bg-gradient-to-r ${categoryColors[category]} border-none` : ''}`}
              data-testid={`filter-${category}`}
            >
              {categoryEmojis[category]} {category}
            </Button>
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button 
                className="rounded-full px-6 py-6 text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/30"
                data-testid="button-add-photo"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <ImagePlus className="w-6 h-6" />
                  Add a Photo of Amrit
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Image URL
                  </label>
                  <Input
                    placeholder="https://example.com/photo.jpg"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="rounded-xl"
                    data-testid="input-image-url"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Category
                  </label>
                  <Select value={newImageCategory} onValueChange={setNewImageCategory}>
                    <SelectTrigger className="rounded-xl" data-testid="select-category">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {imageCategories.map((category) => (
                        <SelectItem key={category} value={category} data-testid={`option-${category}`}>
                          {categoryEmojis[category]} {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleAddImage}
                  disabled={addImage.isPending}
                  className="w-full rounded-xl py-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  data-testid="button-submit-photo"
                >
                  {addImage.isPending ? (
                    <Sparkles className="w-5 h-5 animate-spin" />
                  ) : (
                    "Add to Gallery"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Sparkles className="w-12 h-12 text-pink-400 animate-spin" />
          </div>
        ) : filteredImages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ImagePlus className="w-16 h-16 text-pink-300 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              No photos yet! Add some beautiful moments.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl shadow-lg shadow-pink-100 overflow-hidden border-4 border-white hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-square relative">
                      <img
                        src={image.url}
                        alt={`Amrit - ${image.category}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <button
                        onClick={() => deleteImage.mutate(image.id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-100"
                        data-testid={`button-delete-${image.id}`}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${categoryColors[image.category]}`}>
                        {categoryEmojis[image.category]} {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
