import React, { useCallback, useEffect, useMemo, type FC } from 'react'
import { Grid, Slider } from '@mui/material'
import { type IFormCocktail } from '@/features/cocktail/types'
import { useFormikContext } from 'formik'
import { calculeTotalVolume, textVolume } from '../../utils'
import usePrevious from '@/app/hooks/usePrevious'

interface ProportionColumnProps {
  index: number
}

const ProportionColumn: FC<ProportionColumnProps> = ({
  index
}) => {
  const { values, setFieldValue } = useFormikContext<IFormCocktail>()

  const handleChangeVolume = useCallback((value: number, index: number) => {
    let newVolume = +value.toFixed(1)
    const isIncrease = newVolume > values.ingredients[index].volume
    const currentVolume = values.ingredients[index].volume
    const currentTotalVolume = calculeTotalVolume(values.ingredients)
    const currentIsAlcohol = values.ingredients[index].isAlcohol
    if (isIncrease && (currentTotalVolume - currentVolume + newVolume) > values.glassVolume) {
      newVolume = values.glassVolume - (currentTotalVolume - currentVolume)
    } else if (!isIncrease && (currentTotalVolume - currentVolume + newVolume) < 0) {
      newVolume = currentTotalVolume
    }

    newVolume = +newVolume.toFixed(1)
    setFieldValue(`ingredients[${index}].volume`, newVolume)

    const newTotalVolumeAlcohol = calculeTotalVolume(values.ingredients.filter(item => item.isAlcohol))
    const newTotalVolumeSoft = calculeTotalVolume(values.ingredients.filter(item => !item.isAlcohol))
    const newTotalVolumeByCurrentType = currentIsAlcohol ? newTotalVolumeAlcohol : newTotalVolumeSoft

    values.ingredients.forEach((ingredient, i) => {
      if (ingredient.isAlcohol === currentIsAlcohol) {
        setFieldValue(`ingredients[${i}].proportion`, +((ingredient.volume / newTotalVolumeByCurrentType) * 100).toFixed(2))
      }
    })

    const newAlcoholLevel = +(newTotalVolumeAlcohol / values.glassVolume * 100).toFixed(2)
    setFieldValue('alcoholLevel', newAlcoholLevel)
    if (values.alcoholMinLevel > newAlcoholLevel) {
      setFieldValue('alcoholMinLevel', newAlcoholLevel)
    } else if (values.alcoholMaxLevel < newAlcoholLevel) {
      setFieldValue('alcoholMaxLevel', newAlcoholLevel)
    }
  }, [values.ingredients])

  const ingredientsName = useMemo(() => values.ingredients.map((ingredient) => ingredient.name).join('$%'), [values.ingredients]) // "$%" parce que c'est des caractères peu probable dans le nom d'un coctail

  const previousIngredientName = usePrevious(ingredientsName)

  useEffect(() => {
    if (ingredientsName !== previousIngredientName) {
      handleChangeVolume(values.ingredients[0].volume, 0)
    }
  }, [ingredientsName, previousIngredientName])

  return (
    <Grid container spacing={2} alignItems="center" sx={{ minWidth: 200 }}>
      <Grid item xs marginX={2}>
        <Slider
          valueLabelDisplay="auto"
          value={values.ingredients[index].volume}
          onChange={(_, value) => handleChangeVolume(value as number, index)}
          step={1}
          min={0}
          max={values.glassVolume}
        />
      </Grid>
      <Grid item>
        {textVolume(values.ingredients[index].volume)}
      </Grid>
    </Grid>
  )
}

export default ProportionColumn
