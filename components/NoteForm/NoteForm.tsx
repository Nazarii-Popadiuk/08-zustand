import { Formik, Form,  Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import styles from './NoteForm.module.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";


interface NoteFormProps {
    onClose: () => void;
}

interface FormValues {
    title: string;
    content: string;
    tag: string;
}

const initialValues: FormValues = {
    title: '',
    content: '',
    tag: 'Todo',
}

const validationSchema = Yup.object({
    title: Yup.string().min(3, 'Too short title, min = 3').max(50, 'Too long title, max = 50').required('Title is required'),
    content: Yup.string().max(500, 'Content must be not longer than 500 symbols'),
    tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag').required('Tag is required')
})



export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ title, content, tag }: FormValues) => 
      createNote(title, content, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose()
    }
  })

  const handleSubmit = (values: FormValues) => {
    mutate(values);

    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting, isValid }) => (
                <Form className={styles.form}>
  <div className={styles.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={styles.input} />
    <ErrorMessage component="span" name="title" className={styles.error} />
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="content">Content</label>
    <Field as = "textarea"
      id="content"
      name="content"
      rows={8}
      className={styles.textarea}
    />
    <ErrorMessage component="span"  name="content" className={styles.error} />
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as = "select" id="tag" name="tag" className={styles.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage component="span" name="tag" className={styles.error} />
  </div>

  <div className={styles.actions}>
    <button onClick={onClose} type="button" className={styles.cancelButton}>
      Cancel
    </button>
    <button
      type="submit"
      className={styles.submitButton}
      disabled={isSubmitting || !isValid || isPending}
    >
      {isPending ? 'Creating...' : 'Create note'}
    </button>
  </div>
</Form>

            )}

        </Formik>
    )
}