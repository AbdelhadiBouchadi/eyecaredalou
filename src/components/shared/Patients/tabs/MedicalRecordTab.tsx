'use client';

import { useState } from 'react';
import { Plus, Eye, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MedicalRecord, Patient } from '@prisma/client';
import {
  createMedicalRecord,
  deleteMedicalRecord,
} from '@/lib/actions/patient';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  createMedicalRecordSchema,
  MedicalRecordFormValues,
} from '@/lib/validator';
import { EmptyState } from '../../EmptyState';

interface MedicalRecordTabProps {
  patient: Patient;
  records?: MedicalRecord[];
}

export function MedicalRecordTab({
  patient,
  records = [],
}: MedicalRecordTabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MedicalRecordFormValues>({
    resolver: zodResolver(createMedicalRecordSchema),
    defaultValues: {
      complaint: '',
      diagnosis: '',
      treatment: '',
      prescription: '',
      notes: '',
      date: new Date(),
    },
  });

  const onSubmit = async (values: MedicalRecordFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await createMedicalRecord(patient.id, values);

      if (result.success) {
        toast.success('Dossier médical créé avec succès');
        form.reset();
        setIsOpen(false);
      } else {
        toast.error('Erreur lors de la création du dossier médical');
      }
    } catch (error) {
      toast.error('Erreur lors de la création du dossier médical');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (recordId: string) => {
    try {
      const result = await deleteMedicalRecord(patient.id, recordId);

      if (result.success) {
        toast.success('Dossier médical supprimé avec succès');
      } else {
        toast.error('Erreur lors de la suppression du dossier médical');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression du dossier médical');
      console.error(error);
    }
  };

  if (records.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex-btn gap-4">
          <h1 className="text-xl font-medium sm:block hidden">
            Dossiers Médicaux
          </h1>
          <div className="sm:w-1/4 w-full">
            <Button
              onClick={() => setIsOpen(true)}
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Nouveau Dossier
            </Button>
          </div>
        </div>

        <EmptyState
          icon={FileText}
          title="Aucun dossier médical"
          description="Ce patient n'a pas encore de dossiers médicaux."
        />

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouveau Dossier Médical</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="complaint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plainte</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Plainte du patient"
                          className="shad-textArea"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diagnostic</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Diagnostic"
                          className="shad-textArea"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="treatment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Traitement</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Traitement prescrit"
                          className="shad-textArea"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ordonnance</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ordonnance (optionnel)"
                          className="shad-textArea"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Notes additionnelles (optionnel)"
                          className="shad-textArea"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Création...' : 'Créer le dossier'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex-btn gap-4">
        <h1 className="text-xl font-medium sm:block hidden">
          Dossiers Médicaux
        </h1>
        <div className="sm:w-1/4 w-full">
          <Button
            onClick={() => {
              setSelectedRecord(null);
              setIsOpen(true);
            }}
            className="w-full flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouveau Dossier
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-gray-50 items-start grid grid-cols-12 gap-4 rounded-xl border border-gray-200 p-6"
          >
            <div className="col-span-12 md:col-span-2">
              <p className="text-xs text-gray-500 font-medium">
                {format(new Date(record.date), 'PPP', { locale: fr })}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <p className="text-xs text-gray-700">
                <span className="font-bold">Plainte:</span> {record.complaint}
              </p>
              <p className="text-xs text-gray-700">
                <span className="font-bold">Diagnostic:</span>{' '}
                {record.diagnosis}
              </p>
              <p className="text-xs text-gray-700">
                <span className="font-bold">Traitement:</span>{' '}
                {record.treatment}
              </p>
              {record.prescription && (
                <p className="text-xs text-gray-700">
                  <span className="font-bold">Ordonnance:</span>{' '}
                  {record.prescription}
                </p>
              )}
              {record.notes && (
                <p className="text-xs text-gray-700">
                  <span className="font-bold">Notes:</span> {record.notes}
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-2 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setSelectedRecord(record);
                  setIsOpen(true);
                }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500"
                onClick={() => handleDelete(record.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedRecord
                ? 'Voir le Dossier Médical'
                : 'Nouveau Dossier Médical'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="complaint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plainte</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Plainte du patient"
                        className="shad-textArea"
                        {...field}
                        disabled={!!selectedRecord}
                        defaultValue={selectedRecord?.complaint}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnostic</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Diagnostic"
                        className="shad-textArea"
                        {...field}
                        disabled={!!selectedRecord}
                        defaultValue={selectedRecord?.diagnosis}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="treatment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Traitement</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Traitement prescrit"
                        className="shad-textArea"
                        {...field}
                        disabled={!!selectedRecord}
                        defaultValue={selectedRecord?.treatment}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ordonnance</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ordonnance (optionnel)"
                        className="shad-textArea"
                        {...field}
                        disabled={!!selectedRecord}
                        defaultValue={selectedRecord?.prescription || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Notes additionnelles (optionnel)"
                        className="shad-textArea"
                        {...field}
                        disabled={!!selectedRecord}
                        defaultValue={selectedRecord?.notes || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!selectedRecord && (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Création...' : 'Créer le dossier'}
                </Button>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
