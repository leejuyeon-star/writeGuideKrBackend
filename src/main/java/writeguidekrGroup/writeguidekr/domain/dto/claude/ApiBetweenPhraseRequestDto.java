package writeguidekrGroup.writeguidekr.domain.dto.claude;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data      // @ToString + @Getter + @Setter + @RequiredArgsConstructor + @EqualsAndHashCode
@NoArgsConstructor
public class ApiBetweenPhraseRequestDto {
    private String targetWord;
    private String targetSentence;
    private String targetBeforeWord;
}
