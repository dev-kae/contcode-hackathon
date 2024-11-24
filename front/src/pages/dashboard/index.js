import React, { useState } from "react";
import PropTypes from "prop-types";
import Layout from "@/app/Layout";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import api from "@/axiosConfig";

const Index = () => {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [logos, setLogos] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleContinue = async () => {
    try {
      setLoading(true);
      setIsSecondModalOpen(true);
      const response = await api.post("/logo/generate");
      setLogos(response.data[0]);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
      setError("Erro ao gerar imagem");
    }
  };

  return (
    <Layout>
      {/* Primeiro Modal */}
      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="flex flex-col md:flex-row justify-center items-center gap-16 p-10">
              <div className="bg-white shadow-md w-52 overflow-hidden rounded-2xl">
                <div className="relative">
                  <span className="absolute top-3 left-3 capitalize text-white bg-red-500 rounded px-3 py-1">
                    Exclusivo
                  </span>
                  <img
                    src="https://img.freepik.com/vetores-premium/ilustracao-em-vetor-plana-de-icone-de-inteligencia-artificial-ai_423491-69.jpg"
                    alt="Rent Savings"
                    className="h-56 object-cover"
                  />
                </div>

                <div className="pt-3 pb-4 px-3.5">
                  <h1 className="text-lg capitalize font-semibold">
                    Gerar logos com IA
                  </h1>
                </div>
              </div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Criação de logo</AlertDialogTitle>
              <AlertDialogDescription>
                Nós criaremos sua logo com IA usando as informações fornecidas
                sobre seu negócio.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleContinue}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Segundo Modal */}
      <AlertDialog open={isSecondModalOpen} onOpenChange={setIsSecondModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logos</AlertDialogTitle>
            <AlertDialogDescription>
              Essas são as logos geradas para o seu negócio, escolha a sua
              preferida
              <br />
              {loading && (
                <div className="text-center" style={{ marginTop: "1rem" }}>
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              <img src={logos} />
              {error && <h4 className="mt-4 text-red-500">{error}</h4>}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsSecondModalOpen(false)}>
              Fechar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

Index.propTypes = {};

export default Index;
