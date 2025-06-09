import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import { Separator } from "~/components/ui/separator";
import { ShoppingBag } from "lucide-react";

export default function OrderSummary() {
  return (
    <Card className="sticky top-10">
      <CardHeader>
        <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
        <CardDescription>Detalhes da sua compra</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-gray-500" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-medium">Produto Premium</p>
            <p className="text-sm text-gray-500">Quantidade: 1</p>
          </div>
          <div className="font-medium">R$ 279,90</div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>R$ 279,90</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Frete</span>
            <span>R$ 20,00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Desconto</span>
            <span className="text-green-600">- R$ 0,00</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>R$ 299,90</span>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>* Frete calculado para CEP: 01000-000</p>
          <p>* Entrega estimada: 3-5 dias úteis</p>
        </div>
      </CardContent>
      <CardFooter className="rounded-b-lg">
        <div className="w-full text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Métodos de pagamento aceitos:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="bg-background-700 border-background-600 border rounded px-2 py-1 text-xs">
              Visa
            </div>
            <div className="bg-background-700 border-background-600 border rounded px-2 py-1 text-xs">
              Mastercard
            </div>
            <div className="bg-background-700 border-background-600 border rounded px-2 py-1 text-xs">
              Elo
            </div>
            <div className="bg-background-700 border-background-600 border rounded px-2 py-1 text-xs">
              Hipercard
            </div>
            <div className="bg-background-700 border-background-600 border rounded px-2 py-1 text-xs">
              Boleto
            </div>
            <div className="bg-background-700 border-background-600 border rounded px-2 py-1 text-xs">
              PIX
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
