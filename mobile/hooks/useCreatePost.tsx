import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useApiClient, userApi } from "@/utils/api";

export const useCreatePost = () => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const api = useApiClient();
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: async (postData: { content: string; imageUrl?: string }) => {
      const formData = new FormData();
      if(postData.content) formData.append("content",postData.content);

      if (postData.imageUrl) {
        const uriParts = postData.imageUrl.split(".");
        const fileType = uriParts[uriParts.length - 1].toLowerCase();

        const mimeTypeMap: Record<string, string> = {
          png: "image/png",
          gif: "image/gif",
          webp: "image/webp",
        };
        const mimeType = mimeTypeMap[fileType] || "image/jpeg";

        formData.append("image", {
          uri: postData.imageUrl,
          name: `image.${fileType}`,
          type: mimeType,
        } as any);
      }
      console.log(formData);
      return api.post("/post/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      setContent("");
      setSelectedImage("");
      queryClient.invalidateQueries({ queryKey: ["post"] });
      Alert.alert("Post created successfully");
    },
    onError: (error) => {
      console.log("failed to create posts" , error);
      Alert.alert("Error", "failed to create post");
    },
  });

  const handleImagePicker = async (useCamera: boolean = false) => {
    const permissionResult = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      const source = useCamera ? "camera" : "photo library";
      Alert.alert(
        "Permission needed",
        `Please grant permission to access your ${source}`
      );
      return;
    }

    const pickerOptions = {
      allowsEditing: true,
      aspect: [16, 9] as [number, number],
      quality: 0.8,
    };

    const result = useCamera
      ? await ImagePicker.launchCameraAsync(pickerOptions)
      : await ImagePicker.launchImageLibraryAsync({
          ...pickerOptions,
          mediaTypes: ["images"],
        });

    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const createPost = () => {
    if (!content.trim() && !selectedImage) {
      Alert.alert(
        "Empty Post",
        "Please write something or add an image before posting!"
      );
      return ;
    }

    const postData: { content: string; imageUrl?: string } = {
      content: content.trim(),
    };

    if (selectedImage){
      postData.imageUrl = selectedImage;
    } 
    
    createPostMutation.mutate(postData);
    
  };

  return {
    content,
    setContent,
    selectedImage,
    isCreating: createPostMutation.isPending,
    pickImageFromGallery: () => handleImagePicker(false),
    takePhoto: () => handleImagePicker(true),
    removeImage: () => setSelectedImage(null),
    createPost,
  };
};
