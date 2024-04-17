import { useContext, useEffect, useState } from "react";
import useAuth from "./use-auth";
import { ToastContext } from "../contexts/toast-context";
import DocumentInterface from "../types/interfaces/document";
import DocumentService from "../services/document-service";
import axios, { AxiosError } from "axios";

const useDocument = (documentId: number) => {
  const { accessToken } = useAuth();
  const { error } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [document, setDocument] = useState<DocumentInterface | null>(null);

  const loadDocument = async (accessToken: string, documentId: number) => {
    setLoading(true);

    try {
      const response = await DocumentService.get(accessToken, documentId);
      setDocument(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        if (response?.status === 404) {
          setErrors((prev) => [...prev, "Document does not exist"]);
        } else {
          setErrors((prev) => [
            ...prev,
            "An unknown error has occurred. Please try again.",
          ]);
        }
      } else {
        setErrors((prev) => [
          ...prev,
          "An unknown error has occurred. Please try again.",
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;

    loadDocument(accessToken, documentId);
  }, [accessToken, documentId, error]);

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => {
        error(err);
      });
    }
  }, [errors, error]); 
  return {
    document,
    errors,
    loading,
  };
};

export default useDocument;
