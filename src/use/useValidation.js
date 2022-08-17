import { computed } from 'vue';
export default function useValidation(validator, value) {
  
  const validated = computed(() => validator.test(value.value));
  return validated;
}
